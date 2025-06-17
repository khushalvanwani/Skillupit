import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from './Context/ThemeContext';
import { ProfileProvider } from './Context/ProfileContext';
import { SubjectProvider } from './Context/SubjectContext';
import { AuthProvider } from './Context/AuthContext';
import { QuizProvider } from './Context/QuizContext';


import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import SignupScreen from './Screen/SignupScreen';
import OptionsScreen from './Screen/OptionsScreen';
import TestSectionScreen from './Screen/TestSectionScreen';
import QuizScreen from './Screen/QuizScreen';
import AnalyticsScreen from './Screen/AnalyticsScreen';
import ProfileScreen from './Screen/ProfileScreen';
import SubjectSelectionScreen from './Screen/SubjectSelectionScreen';
import SettingsScreen from './Screen/SettingsScreen';
import ActivityScreen from './Screen/ActivityScreen';
import TopicListScreen from './Screen/TopicList';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Options"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0f0f2b', borderTopColor: '#29294d' },
        tabBarActiveTintColor: '#c84490',
        tabBarInactiveTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Options"
        component={OptionsScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Test"
        component={TestSectionScreen}
        options={{
          tabBarLabel: 'Test Section',
          tabBarIcon: ({ color, size }) => <Ionicons name="flask" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ProfileProvider>
          <SubjectProvider>
            <QuizProvider>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Splash" component={SplashScreen} />
                  <Stack.Screen name="Signup" component={SignupScreen} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="MainTabs" component={MainTabs} />
                  <Stack.Screen name="SubjectSelection" component={SubjectSelectionScreen} />
                  <Stack.Screen name="TopicList" component={TopicListScreen} />
                  <Stack.Screen name="Quiz" component={QuizScreen} />
                  <Stack.Screen name="Analytics" component={AnalyticsScreen} />
                  <Stack.Screen name="Profile" component={ProfileScreen} />
                  <Stack.Screen name="Settings" component={SettingsScreen} />
                  <Stack.Screen name="Activity" component={ActivityScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </QuizProvider>
          </SubjectProvider>
        </ProfileProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}