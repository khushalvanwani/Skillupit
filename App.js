import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from './ThemeContext';
import { ProfileProvider } from './ProfileContext';
import { SubjectProvider } from './SubjectContext';
import { AuthProvider } from './AuthContext';
import { QuizProvider } from './QuizContext';


import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import OptionsScreen from './OptionsScreen';
import TestSectionScreen from './TestSectionScreen';
import QuizScreen from './QuizScreen';
import AnalyticsScreen from './AnalyticsScreen';
import ProfileScreen from './ProfileScreen';
import SubjectSelectionScreen from './SubjectSelectionScreen';
import SettingsScreen from './SettingsScreen';
import ActivityScreen from './ActivityScreen';
import TopicListScreen from './TopicList';


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