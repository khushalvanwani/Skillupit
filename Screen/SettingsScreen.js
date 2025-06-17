import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Switch,
  Pressable,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();
  // Mock user data
  const username = "hhcffs4g6";
  const email = "hhcffs4g6@privaterelay.appleid.com";
  // Toggles
  const [offlineSets, setOfflineSets] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.headerRow}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 32 }} /> {/* spacer */}
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 0 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Personal information */}
        <Text style={styles.sectionHeader}>Personal information</Text>
        <View style={styles.card}>
          <Pressable style={styles.row}>
            <View>
              <Text style={styles.label}>Username</Text>
              <Text style={styles.value}>{username}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#8a8ee6" />
          </Pressable>
          <Pressable style={styles.row}>
            <View>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{email}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#8a8ee6" />
          </Pressable>
          <Pressable style={styles.row}>
            <Text style={styles.label}>Create password</Text>
            <Ionicons name="chevron-forward" size={22} color="#8a8ee6" />
          </Pressable>
        </View>

        {/* Offline studying */}
        <Text style={styles.sectionHeader}>Offline studying</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Save sets for offline studying</Text>
              <Text style={styles.hint}>Your eight most recently studied sets will be downloaded automatically</Text>
            </View>
            <Switch
              value={offlineSets}
              onValueChange={setOfflineSets}
              trackColor={{ false: "#474788", true: "#8a8ee6" }}
              thumbColor={offlineSets ? "#fff" : "#222348"}
            />
          </View>
          <Pressable style={styles.row}>
            <Text style={styles.label}>Manage storage</Text>
            <Ionicons name="chevron-forward" size={22} color="#8a8ee6" />
          </Pressable>
        </View>

        {/* Preferences */}
        <Text style={styles.sectionHeader}>Preferences</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Push notifications</Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: "#474788", true: "#8a8ee6" }}
              thumbColor={pushNotifications ? "#fff" : "#222348"}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sound effects</Text>
            <Switch
              value={soundEffects}
              onValueChange={setSoundEffects}
              trackColor={{ false: "#474788", true: "#8a8ee6" }}
              thumbColor={soundEffects ? "#fff" : "#222348"}
            />
          </View>
        </View>

        {/* About */}
        <Text style={styles.sectionHeader}>About</Text>
        <View style={styles.card}>
          <Pressable style={styles.row}>
            <Text style={styles.label}>Privacy policy</Text>
            <Ionicons name="chevron-forward" size={22} color="#8a8ee6" />
          </Pressable>
          <Pressable style={styles.row}>
            <Text style={styles.label}>Terms of service</Text>
            <Ionicons name="chevron-forward" size={22} color="#8a8ee6" />
          </Pressable>
          <Pressable style={styles.row}>
            <Text style={styles.label}>Open source licenses</Text>
            <Ionicons name="chevron-forward" size={22} color="#8a8ee6" />
          </Pressable>
          <Pressable style={styles.row}>
            <Text style={styles.label}>Help Centre</Text>
            <Ionicons name="chevron-forward" size={22} color="#8a8ee6" />
          </Pressable>
        </View>

        {/* Danger zone */}
        <Pressable style={styles.dangerBtn}>
          <Text style={styles.dangerBtnText}>Log out</Text>
        </Pressable>
        <Pressable style={styles.deleteBtn}>
          <Text style={styles.deleteBtnText}>Delete account</Text>
        </Pressable>
        <Text style={styles.appVersion}>v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#0f0f2b' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 20,
    marginBottom: 4,
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
  sectionHeader: {
    color: '#d6d8f7',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 7,
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#17174C',
    borderRadius: 18,
    marginBottom: 13,
    paddingHorizontal: 18,
    paddingVertical: 2,
    width: '92%',
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: '#24225C',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#222348',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    color: '#d6d8f7',
    fontSize: 15,
    marginTop: 5,
    fontWeight: '400',
  },
  hint: {
    color: '#babdf3',
    fontSize: 13,
    marginTop: 5,
    width: 180,
  },
  dangerBtn: {
    marginTop: 18,
    backgroundColor: '#24225C',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginHorizontal: 20,
    borderWidth: 1.2,
    borderColor: '#8a8ee6',
  },
  dangerBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  deleteBtn: {
    marginTop: 10,
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginHorizontal: 20,
    borderWidth: 1.2,
    borderColor: '#ff858c',
  },
  deleteBtnText: {
    color: '#ff858c',
    fontSize: 17,
    fontWeight: 'bold',
  },
  appVersion: {
    color: '#babdf3',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 14,
    fontSize: 15,
  },
});