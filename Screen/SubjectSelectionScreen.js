import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const subjects = [
  { id: 1, label: 'C++', icon: 'logo-codepen' },
  { id: 2, label: 'JavaScript', icon: 'logo-javascript' },
  { id: 3, label: 'Python', icon: 'logo-python' },
  { id: 4, label: 'React', icon: 'logo-react' },
  { id: 5, label: 'SQL', icon: 'server' },
  { id: 6, label: 'HTML & CSS', icon: 'logo-html5' },
];

const SubjectSelectionScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Subject</Text>
      {subjects.map((subject) => (
        <Pressable
          key={subject.id}
          style={styles.subjectCard}
          onPress={() => navigation.navigate('Quiz', { subject: subject.label })}
        >
          <Ionicons name={subject.icon} size={32} color="#c84490" />
          <Text style={styles.subjectLabel}>{subject.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#2b2c83',
  },
  subjectCard: {
    backgroundColor: '#fce5ef',
    width: '90%',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#2b2c83',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  subjectLabel: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c84490',
  },
});

export default SubjectSelectionScreen;