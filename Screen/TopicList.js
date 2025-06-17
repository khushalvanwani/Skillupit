import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../Context/AuthContext'; // <-- get token
import { useSubjectContext } from '../Context/SubjectContext';

const iconMap = {
  "fas fa-code-branch": "source-branch",
  "fa-solid fa-retweet": "repeat",
  "fa-solid fa-code": "code-tags",
  "fa-solid fa-code-pull-request": "git",
  "fa-solid fa-sitemap": "sitemap",
  "fa-solid fa-gears": "cogs",
  "fa-solid fa-microchip": "chip",
  "fa-solid fa-rectangle-xmark": "close-box-outline",
  "fa-solid fa-file-code": "file-document-outline",
};
function getMCIIconName(apiIcon) {
  return iconMap[apiIcon] || "book-open-variant";
}

export default function TopicListScreen() {
  const navigation = useNavigation();
  const { token } = useAuth();
  const { currentSubject } = useSubjectContext();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentSubject) return;
    setLoading(true);
    fetch(`https://www.skillupitacademy.com/backend/public/api/auth/getQuizTopicData/${currentSubject.apiCode || 'cpp01'}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setTopics)
      .catch(() => setTopics([]))
      .finally(() => setLoading(false));
  }, [currentSubject, token]);

  const handleTopicPress = (topic) => {
    navigation.navigate('Quiz', { topicCode: topic.topic_code, topicName: topic.topic });
  };

  if (!currentSubject) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0f2b' }}>
      <View style={{ padding: 24, flex: 1 }}>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
          {currentSubject.label} Topics
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color="#f863b5" />
        ) : (
          <FlatList
            data={topics}
            keyExtractor={item => item.topic_code}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleTopicPress(item)}>
                <View style={styles.topicRow}>
                  <MaterialCommunityIcons
                    name={getMCIIconName(item.icon)}
                    size={28}
                    color="#f863b5"
                    style={{ marginRight: 18 }}
                  />
                  <Text style={styles.topicLabel}>{item.topic}</Text>
                </View>
              </Pressable>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topicRow: {
    backgroundColor: '#232378',
    borderRadius: 14,
    padding: 20,
    marginBottom: 14,
    alignItems: 'center',
    flexDirection: 'row',
  },
  topicLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});