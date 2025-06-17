import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../Context/ThemeContext';
import { ProfileContext } from '../Context/ProfileContext';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { profile } = useContext(ProfileContext);

  const backgroundColor = '#0f0f2b';
  const textColor = '#fff';
  // const panda = require('../assets/panda.png'); // use your brand image

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.headerRow}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color={textColor} />
        </Pressable>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 32 }} /> {/* Spacer for symmetry */}
      </View>

      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 40,
          paddingHorizontal: 0,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar + Username */}
        <View style={styles.avatarWrap}>
          {/* <Image source={panda} style={styles.avatar} /> */}
          <Text style={styles.username}>{profile?.name || "hhcffs4g6"}</Text>
        </View>

        {/* Settings + Activity */}
        <Pressable style={styles.cardBtn} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={24} color="#B5B6F7" style={{ marginRight: 16 }} />
          <Text style={styles.cardBtnText}>Settings</Text>
        </Pressable>
       <Pressable style={styles.cardBtn} onPress={() => navigation.navigate('Activity')}>
  <Ionicons name="notifications-outline" size={24} color="#B5B6F7" style={{ marginRight: 16 }} />
  <Text style={styles.cardBtnText}>Activity</Text>
</Pressable>

        {/* Achievements */}
        <View style={styles.achievementsRow}>
          <Text style={styles.achievementsTitle}>Achievements</Text>
          <Text style={styles.achievementsViewAll}>View all</Text>
        </View>
        <View style={styles.achievementCard}>
          <View style={styles.achievementIconWrap}>
            <Ionicons name="flame" size={38} color="#FFB446" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.achievementMain}>Start a study streak</Text>
            <Text style={styles.achievementDesc}>
              Streaks help you stay motivated and reach your goals. Start your first streak today!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f2b' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
    paddingHorizontal: 14,
    paddingTop: 18,
  },
  backBtn: { padding: 2 },
  headerTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 10,
  },
  avatarWrap: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 14,
    width: '100%',
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#B5B6F7',
    marginBottom: 10,
  },
  username: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 14,
  },
  cardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#17174C',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 26,
    marginBottom: 15,
    width: '88%',
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: '#24225C',
  },
  cardBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
  },
  achievementsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 7,
    width: '88%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  achievementsTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  achievementsViewAll: {
    color: '#B5B6F7',
    fontWeight: '500',
    fontSize: 14,
  },
  achievementCard: {
    backgroundColor: '#24225C',
    borderRadius: 18,
    marginTop: 7,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 120,
    width: '88%',
    alignSelf: 'center',
  },
  achievementIconWrap: {
    width: 60,
    height: 60,
    backgroundColor: '#3F3D6B',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  achievementMain: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 7,
  },
  achievementDesc: {
    color: '#D8DAF6',
    fontSize: 14,
    lineHeight: 18,
  },
});


