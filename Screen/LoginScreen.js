import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useAuth } from '../Context/AuthContext'; // <-- Add this!

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // <-- Add this!

  const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Please enter both email and password.');
    return;
  }
  setLoading(true);
  try {
    const res = await fetch('https://www.skillupitacademy.com/backend/public/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok && data.token) {
      // Normal login success
      await login(data.user, data.token);
      navigation.replace('MainTabs', { name: 'Developer' });
    } else if (data.error === 'Already logged in') {
      // Don't login: Ask user to logout from website or wait for session expiry
      Alert.alert(
        'Already logged in',
        'You are already logged in elsewhere. Please logout from all devices or wait a few minutes, then try again.'
      );
    } else {
      Alert.alert('Login failed', data.error || 'Invalid credentials.');
    }
  } catch (err) {
    Alert.alert('Network Error', err.message);
  }
  setLoading(false);
};

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Log in</Text>

        <TextInput
          style={styles.input}
          placeholder="Email or username"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordWrapper}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable onPress={() => setSecureText(!secureText)}>
            <Icon
              name={secureText ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="#aaa"
              style={{ marginLeft: 10 }}
            />
          </Pressable>
        </View>

        <Pressable style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
          <Text style={styles.loginText}>{loading ? 'Logging in...' : 'Log in'}</Text>
        </Pressable>

        <Pressable>
          <Text style={styles.forgot}>Forgot password</Text>
        </Pressable>
      </ScrollView>

      {/* Social Buttons at Bottom */}
      <View style={styles.bottomSocials}>
        <Pressable style={styles.googleBtn}>
          <Text style={styles.googleText}>G  Continue with Google</Text>
        </Pressable>

        <Pressable style={styles.appleBtn}>
          <Text style={styles.appleText}>  Continue with Apple</Text>
        </Pressable>

        <Pressable style={styles.facebookBtn}>
          <Text style={styles.facebookText}>f  Continue with Facebook</Text>
        </Pressable>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f2b',
    justifyContent: 'space-between',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#2b2d42',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    color: '#fff',
    marginBottom: 15,
    fontSize: 16,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  loginBtn: {
    backgroundColor: '#3e4162',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgot: {
    color: '#8aaaff',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  bottomSocials: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  googleBtn: {
    backgroundColor: '#4e6af1',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  googleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  appleBtn: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  appleText: {
    color: '#000',
    fontWeight: 'bold',
  },
  facebookBtn: {
    backgroundColor: '#182c4d',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  facebookText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
