import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Pressable, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSubjectContext } from './SubjectContext'; // CORRECT!


const { width } = Dimensions.get('window');

export default function TestSectionScreen() {
  const navigation = useNavigation();
  const { subjects, setCurrentSubject } = useSubjectContext(); // ✅ Use context

  const handleSubjectPress = (subject) => {
    setCurrentSubject(subject);
    navigation.navigate('TopicList');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Select your subject</Text>
        <Text style={styles.heroSubtitle}>Start your practice by choosing a topic below</Text>
      </View>
      <FlatList
        data={subjects}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.subjectCard,
              pressed && { opacity: 0.9, transform: [{ scale: 0.97 }] },
            ]}
            onPress={() => handleSubjectPress(item)}
            android_ripple={{ color: '#f863b522' }}
          >
            <LinearGradient
               colors={['#ff6ec4', '#fff']}     // new indigo-blue blend
  start={{ x: 0, y: 0 }}
  end={{ x: 0.3, y: 0.3 }}
  style={styles.gradient}
            >
              <View style={styles.innerOverlay} />
              <View style={styles.cardContent}>
                <MaterialCommunityIcons name={item.icon} size={36} color="#fff" />
                <Text style={styles.subjectLabel}>{item.label.toUpperCase()}</Text>
                <MaterialCommunityIcons name="chevron-right" size={22} color="#fff" />
              </View>
            </LinearGradient>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}


const CARD_WIDTH = width * 0.92;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#0f0f2b',
  },
  heroSection: {
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 18,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 0.8,
    marginBottom: 6,
    textShadowColor: 'rgba(80,0,40,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  heroSubtitle: {
    color: '#f8bcdc',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 48, // extra space for last row
  },
  subjectCard: {
    borderRadius: 22,
    height: 64,
    width: CARD_WIDTH,
    marginVertical: 10,
    marginHorizontal: 4,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    borderRadius: 22,
  },
  innerOverlay: {
    position: 'absolute',
    top: 0,
    height: 28,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  subjectLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
     color: '#193974', 
    textShadowColor: 'rgba(255,255,255,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});