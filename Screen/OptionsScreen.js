import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');

const subjects = [
  { id: '1', label: 'C++', icon: 'code-slash', progress: 50 },
  { id: '2', label: 'HTML/CSS', icon: 'logo-html5', progress: 90 },
  { id: '3', label: 'JavaScript', icon: 'logo-javascript', progress: 80 },
  { id: '4', label: 'React', icon: 'logo-react', progress: 60 },
];

export default function OptionsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Profile and Greeting */}
        <View style={styles.topBar}>
          <Text style={styles.greeting}>Welcome back, <Text style={styles.bold}>Name</Text></Text>
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <View style={styles.profileCircle}>
              <Ionicons name="person" size={26} color="#fff" />
            </View>
          </Pressable>
        </View>

        {/* Student Progress */}
        <Text style={styles.sectionTitle}>Students Progress</Text>
        {subjects.map(subject => (
          <View style={styles.progressCard} key={subject.id}>
            <Ionicons name={subject.icon} size={26} color="#c84490" style={{ marginRight: 16 }} />
            <Text style={styles.progressLabel}>{subject.label}</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFg, { width: `${subject.progress}%` }]} />
            </View>
            <Text style={styles.progressPercent}>{subject.progress}%</Text>
          </View>
        ))}

        {/* Attendance */}
        <Text style={styles.sectionTitle}>Attendance</Text>
        <View style={styles.attendanceContainer}>
          <AnimatedCircularProgress
            size={110}
            width={10}
            fill={75}
            tintColor="#3e4162"
            backgroundColor="#29294d"
            rotation={0}
            lineCap="round"
          >
            {() => (
              <Text style={styles.attendanceText}>75%</Text>
            )}
          </AnimatedCircularProgress>
          <Text style={styles.attendanceDetails}>20 Days Present | 5 Days Absent</Text>
        </View>

        {/* Calendar */}
        <Text style={styles.sectionTitle}>Test Calendar</Text>
        <View style={styles.calendarWrapper}>
          <Calendar
            theme={{
              backgroundColor: '#1c1c3a',
              calendarBackground: '#1c1c3a',
              dayTextColor: '#fff',
              monthTextColor: '#fff',
              textDisabledColor: '#444',
              todayTextColor: '#c84490',
              arrowColor: '#c84490',
              textSectionTitleColor: '#8aaaff',
            }}
            style={{ borderRadius: 10 }}
          />
        </View>

        {/* Test Prep */}
        <View style={styles.testPrepCard}>
          <Text style={styles.testPrepTitle}>Test Prep</Text>
          <Text style={styles.testPrepDesc}>Grow marketing & sales through product.</Text>
          <Pressable style={styles.readMoreBtn}>
            <Text style={styles.readMoreText}>Read More</Text>
          </Pressable>
        </View>

        {/* Info/Insights Card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={24} color="#c84490" style={{ marginRight: 10 }} />
          <View>
            <Text style={styles.infoText}>Based On:</Text>
            <Text style={styles.infoDetail}>• Activities</Text>
            <Text style={styles.infoDetail}>• Sales</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#0f0f2b' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18,
  },
  profileCircle: {
    backgroundColor: '#c84490',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
  },
  greeting: {
    color: '#fff', fontSize: 20, fontWeight: 'bold',
  },
  bold: { color: '#c84490' },
  sectionTitle: {
    color: '#fff', fontSize: 16, fontWeight: 'bold', marginTop: 18, marginBottom: 10,
  },
  progressCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1c1c3a', borderRadius: 12,
    padding: 14, marginBottom: 10,
  },
  progressLabel: { color: '#fff', fontSize: 15, flex: 1 },
  progressBarBg: {
    backgroundColor: '#ddd', borderRadius: 10, height: 8, width: 80, marginRight: 10,
    overflow: 'hidden',
  },
  progressBarFg: {
    backgroundColor: '#c84490', height: 8,
    borderRadius: 10,
  },
  progressPercent: { color: '#8aaaff', fontWeight: 'bold', width: 38 },
  attendanceContainer: {
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  attendanceText: { color: '#3e4162', fontSize: 24, fontWeight: 'bold' },
  attendanceDetails: { color: '#fff', marginTop: 10, fontSize: 13 },
  calendarWrapper: { borderRadius: 10, overflow: 'hidden', marginBottom: 24, backgroundColor: '#1c1c3a' },
  testPrepCard: {
    backgroundColor: '#f863b5', borderRadius: 12, padding: 18, marginBottom: 20,
    alignItems: 'flex-start',
  },
  testPrepTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  testPrepDesc: { color: '#fff', marginBottom: 10 },
  readMoreBtn: {
    backgroundColor: '#fff', borderRadius: 7, paddingVertical: 7, paddingHorizontal: 18,
  },
  readMoreText: { color: '#c84490', fontWeight: 'bold', fontSize: 13 },
  infoCard: {
    backgroundColor: '#162050', borderRadius: 10, flexDirection: 'row', alignItems: 'center',
    padding: 16, marginTop: 10, marginBottom: 30,
  },
  infoText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  infoDetail: { color: '#fff', fontSize: 13 },
  bottomTabs: {
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#29294d', backgroundColor: '#0f0f2b',
    position: 'absolute', bottom: 0, left: 0, width: width,
  },
  tabButton: { alignItems: 'center' },
  tabLabel: { color: 'white', fontSize: 12, marginTop: 4 },
});
