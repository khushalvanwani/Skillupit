import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Dimensions, Image, ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    // We'll link API here later
    console.log('Signup pressed', { name, email, password, confirmPassword });
  };

  return (
    <LinearGradient
      colors={['#2b2c83', '#c84490']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Image
            source={require('./assets/skillup-logo.png')}
            style={styles.logo}
          />

          <Text style={styles.title}>
             <Text style={{ color: '#c84490' }}>Create an</Text> Account
          </Text>

          <View style={styles.inputContainer}>
            <Icon name="account" size={20} color="gray" style={styles.icon} />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="gray"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="email" size={20} color="gray" style={styles.icon} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="gray" style={styles.icon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock-check" size={20} color="gray" style={styles.icon} />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="gray"
              secureTextEntry
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <TouchableOpacity style={styles.signupBtnWrapper} onPress={handleSignup}>
            <LinearGradient
              colors={['#1c2b83', '#c84490']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signupBtn}
            >
              <Text style={styles.signupText}>SIGN UP</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginLink}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    width: width * 0.85,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1c2b83',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#000',
  },
  signupBtnWrapper: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
  },
  signupBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 25,
  },
  signupText: {
    color: 'white',
    fontWeight: '600',
  },
  loginLink: {
    color: '#555',
    marginTop: 10,
    fontWeight: '500',
  },
});
