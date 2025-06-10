import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      navigation.replace('Signup');
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ImageBackground
      // source={require('./assets/bg-pattern.png')} // make a light WhatsApp-like pattern
      style={styles.background}
      resizeMode="repeat"
    >
      <View style={styles.centered}>
        <Animated.Image
          source={require('./assets/transparent.png')} // your SkillUp It logo
          style={[styles.logo, { opacity: fadeAnim }]}
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
