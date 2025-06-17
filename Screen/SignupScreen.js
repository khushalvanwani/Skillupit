import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
// 👇 ADD THIS IMPORT
import { useAuth } from '../Context/AuthContext';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  // 👇 GET login FROM CONTEXT
  const { login } = useAuth();

  function getCurrentDatetimeString() {
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');
    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1);
    const year = now.getFullYear();
    let hours = now.getHours();
    const mins = pad(now.getMinutes());
    const secs = pad(now.getSeconds());
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${year}-${month}-${day}T${pad(hours)}:${mins}:${secs} ${ampm}`;
  }

  const handleSignup = async () => {
    setLoading(true);

    if (!name || !email || !password) {
      Alert.alert('Missing Info', 'Please enter name, email, and password.');
      setLoading(false);
      return;
    }

    const login_date_time = getCurrentDatetimeString();

    const body = {
      name,
      email,
      password,
      username: email,
      login_date_time,
      logout_date_time: 0,
      flag: 0,
    };

    try {
      const res = await fetch('https://www.skillupitacademy.com/backend/public/api/auth/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      if (res.ok && data && data.token) {
        // 👇 Save login (store token & user globally)
        await login(data.user, data.token);

        Alert.alert('Success', 'Account created! Welcome!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      } else {
        const msg = typeof data === 'object'
          ? data?.error || data?.message || Object.values(data).flat().join('\n')
          : data;
        Alert.alert('Signup failed', msg || 'Unknown error');
      }
    } catch (err) {
      Alert.alert('Network Error', err.message);
    }
    setLoading(false);
  };

  // SECRET ADMIN LOGIN (image tap)
  const handleAdminLogin = () => {
    Alert.alert('Admin Login', 'Welcome, Admin!');
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.container}>
        <Pressable style={styles.imageWrapper} onPress={handleAdminLogin} hitSlop={30}>
          <Image
            source={require('../assets/Subject.png')}
            style={styles.image}
          />
        </Pressable>
        <Text style={styles.title}>The best way to study.{"\n"}Sign up for free.</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <View style={styles.passwordWrapper}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
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
        <Pressable
          style={[styles.signupBtn, loading && { opacity: 0.6 }]}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.signupText}>{loading ? 'Signing up...' : 'Sign up'}</Text>
        </Pressable>
        {/* Social sign-up buttons at bottom */}
        <View style={styles.bottomSocials}>
          <Pressable style={[styles.socialBtn, styles.googleBtn]}>
            <Icon name="google" size={24} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.socialText}>Continue with Google</Text>
          </Pressable>
          <Pressable style={[styles.socialBtn, styles.appleBtn]}>
            <Icon name="apple" size={24} color="#222" style={{ marginRight: 8 }} />
            <Text style={[styles.socialText, { color: "#222" }]}>Continue with Apple</Text>
          </Pressable>
          <Pressable style={[styles.socialBtn, styles.facebookBtn]}>
            <Icon name="facebook" size={24} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.socialText}>Continue with Facebook</Text>
          </Pressable>
        </View>
        <View style={styles.loginWrapper}>
          <Text style={styles.loginText}>Have an account? </Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Log in</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171744',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 48,
    justifyContent: 'flex-start',
  },
  imageWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    marginBottom: 18,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#2b2d42',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  signupBtn: {
    backgroundColor: '#4e6af1',
    width: '100%',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
  },
  signupText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  bottomSocials: {
    width: '100%',
    marginTop: 'auto',
    marginBottom: 16,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 14,
    paddingVertical: 13,
    marginBottom: 10,
  },
  googleBtn: {
    backgroundColor: '#4e6af1',
  },
  appleBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ececec',
  },
  facebookBtn: {
    backgroundColor: '#182c4d',
  },
  socialText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  loginWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 8,
    justifyContent: 'center',
  },
  loginText: {
    color: '#a7b0ff',
    fontSize: 15,
  },
  loginLink: {
    color: '#a7b0ff',
    fontWeight: 'bold',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});