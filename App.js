import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './ThemeContext';
import { ProfileProvider } from './ProfileContext';

import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen'; // ✅ Newly added signup screen
import OptionsScreen from './OptionsScreen';
import QuizScreen from './QuizScreen';
import AnalyticsScreen from './AnalyticsScreen';
import ProfileScreen from './ProfileScreen';
import SubjectSelectionScreen from './SubjectSelectionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Options" component={OptionsScreen} />
            <Stack.Screen name="SubjectSelection" component={SubjectSelectionScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen name="Analytics" component={AnalyticsScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ProfileProvider>
    </ThemeProvider>
  );
}