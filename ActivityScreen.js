import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ActivityScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable onPress={() => navigation.goBack()} style={{ padding: 6 }}>
          <Ionicons name="close" size={32} color="#b5b6f7" />
        </Pressable>
        <Text style={styles.headerTitle}>Activity</Text>
        <View style={{ width: 32 }} /> {/* spacer for symmetry */}
      </View>
      <View style={styles.content}>
        <View style={styles.bellWrap}>
          <Ionicons name="notifications" size={90} color="#FFC82D" />
          <View style={styles.checkIcon}>
            <Ionicons name="checkmark-done" size={28} color="#7278fa" />
          </View>
        </View>
        <Text style={styles.upToDate}>You’re up to date!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#363e5c' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 24,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  checkIcon: {
    position: 'absolute',
    right: 6,
    bottom: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 3,
    elevation: 3,
  },
  upToDate: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 18,
    letterSpacing: 0.3,
  },
});