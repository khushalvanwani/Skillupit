import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from './ThemeContext';

// Custom Animated Progress Bar Component
const AnimatedProgressBar = ({ progress, barColor, style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false, // width animation needs non-native driver
    }).start();
  }, [progress]);

  const widthInterpolated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.progressContainer, style]}>
      <Animated.View style={[styles.animatedBar, { width: widthInterpolated, backgroundColor: barColor }]} />
    </View>
  );
};

const AnalyticsScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode, toggleMode } = useContext(ThemeContext);

  // Dummy subject scores – replace with real data when available
  const subjectScores = {
    "C++": 20,
    "JS": 15,
    "Python": 10,
    "React": 5,
    "SQL": 0,
    "HTML and CSS": 8,
  };
  const maxScore = 30;

  const backgroundColor = isDarkMode ? '#121212' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#121212';
  const cardBackground = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Header with Back, Dark Mode Toggle & Profile Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>Analytics</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.modeButton} onPress={toggleMode}>
            {isDarkMode ? (
              <Ionicons name="sunny" size={24} color="#FFD700" />
            ) : (
              <Ionicons name="moon" size={24} color="#4B4B4B" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle" size={30} color={textColor} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {Object.keys(subjectScores).map((subject, index) => {
          const progress = Number((subjectScores[subject] / maxScore).toFixed(2));
          return (
            <LinearGradient
              key={index}
              colors={isDarkMode ? ['#333', '#555'] : ['#f9f9f9', '#e0e0e0']}
              style={[styles.card, { backgroundColor: cardBackground }]}
            >
              <Text style={[styles.subject, { color: textColor }]}>{subject}</Text>
              <AnimatedProgressBar 
                progress={progress} 
                barColor="#6200EE" 
                style={styles.progressBarStyle} 
              />
              <Text style={[styles.score, { color: textColor }]}>{subjectScores[subject]} / {maxScore}</Text>
            </LinearGradient>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  backButton: { padding: 10 },
  title: { fontSize: 24, fontWeight: '600' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  modeButton: { padding: 10, marginRight: 10 },
  profileButton: { padding: 10 },
  content: { paddingHorizontal: 20, paddingBottom: 30 },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  subject: { fontSize: 20, fontWeight: '500', marginBottom: 8 },
  // Container for the animated progress bar (the background track)
  progressContainer: {
    width: '100%',
    height: 10,
    borderRadius: 4,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    marginBottom: 8,
  },
  animatedBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressBarStyle: {
    marginBottom: 8,
  },
  score: { fontSize: 14, fontWeight: '400' },
});

export default AnalyticsScreen;
