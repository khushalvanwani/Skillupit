import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons as Icon, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    navigation.navigate('Options', { name: 'Developer' });
  };

  return (
    <LinearGradient
      colors={["#2b2c83", "#c84490"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.card}>
        <Image
           source={require('./assets/skillup-logo.png')} // Make sure this is the correct logo pathr
          style={styles.logo}
        />
        <Text style={styles.title}>
          <Text style={{ color: '#1c2b83' }}>Log</Text>
          <Text style={{ color: '#c84490' }}>in</Text>
        </Text>

        <View style={styles.inputContainer}>
          <Icon name="account" size={20} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="gray"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="gray"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotText}>
            <Text style={{ color: '#1c2b83' }}>Forgot </Text>
            <Text style={{ color: '#c84490' }}>Password</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtnWrapper} onPress={handleLogin}>
          <LinearGradient
            colors={["#1c2b83", "#c84490"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.loginBtn}
          >
            <Text style={styles.loginText}>LOGIN</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}

        <Text style={styles.signupText}>Or Sign Up Using</Text>

        <View style={styles.socialContainer}>
          <FontAwesome name="facebook" size={30} color="#3b5998" style={styles.socialIcon} />
          <FontAwesome name="twitter" size={30} color="#1DA1F2" style={styles.socialIcon} />
          <FontAwesome name="google" size={30} color="#DB4437" style={styles.socialIcon} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
  <Text style={styles.signupPrompt}>
    Don't have an account?
    <Text style={{ color: '#1c2b83' }}> Sign </Text>
    <Text style={{ color: '#c84490' }}>Up</Text>
  </Text>
</TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width * 0.85,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  forgotText: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    fontWeight: '500',
  },
  loginBtnWrapper: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
  },
  loginBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 25,
  },
  loginText: {
    color: 'white',
    fontWeight: '600',
  },
  signupText: {
    color: '#555',
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 8,
    resizeMode: 'contain',
  },
  signupPrompt: {
    color: '#555',
    marginTop: 5,
  },
});
