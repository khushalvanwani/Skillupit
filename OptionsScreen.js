import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from './ThemeContext';
import { ProfileContext } from './ProfileContext';

const subjects = [
  { id: '1', label: 'C++', progress: 50, icon: 'code-slash' },
  { id: '2', label: 'HTML/CSS', progress: 90, icon: 'logo-html5' },
  { id: '3', label: 'JavaScript', progress: 80, icon: 'logo-javascript' },
  { id: '4', label: 'React', progress: 60, icon: 'logo-react' },
];

const OptionsScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode, toggleMode } = useContext(ThemeContext);
  const { profile } = useContext(ProfileContext);

  const backgroundColor = isDarkMode ? '#121212' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#121212';

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor }]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Pressable style={styles.modeButton} onPress={toggleMode}>
            <Ionicons name={isDarkMode ? 'sunny' : 'moon'} size={24} color={isDarkMode ? '#FFD700' : '#4B4B4B'} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle" size={30} color={textColor} />
          </Pressable>
        </View>

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>Welcome back <Text style={styles.bold}>{profile.name || 'Whysu'}</Text></Text>
          <Text style={styles.subText}>You have completed 80% of the task</Text>
          <Text style={styles.subText}>Progress very good!</Text>
        </View>

        {/* Subject Progress */}
        <Text style={[styles.sectionTitle, { color: textColor }]}>Students Progress</Text>
        {subjects.map((subject) => (
          <View key={subject.id} style={styles.subjectCard}>
            <View style={styles.subjectHeader}>
              <Ionicons name={subject.icon} size={24} color="#c84490" />
              <Text style={styles.subjectLabel}>{subject.label}</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${subject.progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{subject.progress}%</Text>
          </View>
        ))}

        {/* Attendance */}
        <Text style={[styles.sectionTitle, { color: textColor, marginTop: 20 }]}>Attendance</Text>
        <View style={styles.attendanceCard}>
          <Text style={styles.attendanceCircle}>75%</Text>
          <Text style={{ color: textColor, marginTop: 10 }}>20 Days Present | 5 Days Absent</Text>
        </View>

        {/* Test Prep */}
        <View style={styles.testCard}>
          <Text style={styles.testTitle}>Test Prep</Text>
          <Text style={styles.testDesc}>Grow marketing & sales through product.</Text>
          <Pressable style={styles.readMore}><Text style={styles.readMoreText}>Read More</Text></Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: { flex: 1 },
  topBar: {
    flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20,
  },
  modeButton: { padding: 10, marginRight: 10 },
  welcomeCard: {
    backgroundColor: '#e8f0ff', padding: 20, borderRadius: 10, marginBottom: 20,
  },
  welcomeText: { fontSize: 22, color: '#2b2c83' },
  bold: { fontWeight: 'bold' },
  subText: { fontSize: 16, marginTop: 5, color: '#333' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subjectCard: {
    backgroundColor: '#fce5ef', borderRadius: 10, padding: 15, marginBottom: 15,
  },
  subjectHeader: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 10,
  },
  subjectLabel: { fontSize: 18, fontWeight: 'bold', color: '#2b2c83' },
  progressBarContainer: {
    height: 10, backgroundColor: '#e0e0e0', borderRadius: 5, overflow: 'hidden',
  },
  progressBar: {
    height: 10, backgroundColor: '#c84490',
  },
  progressText: {
    textAlign: 'right', marginTop: 5, color: '#2b2c83', fontWeight: 'bold',
  },
  attendanceCard: {
    alignItems: 'center', marginBottom: 30,
  },
  attendanceCircle: {
    fontSize: 32, fontWeight: 'bold', color: '#2b2c83', borderWidth: 4, borderRadius: 60,
    borderColor: '#c84490', padding: 30, textAlign: 'center',
  },
  testCard: {
    backgroundColor: '#fce5ef', borderRadius: 12, padding: 20, marginVertical: 10,
  },
  testTitle: { fontSize: 20, fontWeight: 'bold', color: '#c84490' },
  testDesc: { color: '#2b2c83', marginVertical: 8 },
  readMore: {
    backgroundColor: '#c84490', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, alignSelf: 'flex-start',
  },
  readMoreText: { color: '#fff', fontWeight: 'bold' },
});

export default OptionsScreen;
