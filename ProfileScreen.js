import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext';
import { ProfileContext } from './ProfileContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);
  const { profile, updateProfile } = useContext(ProfileContext);
  
  // Set initial values from profile context
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [profileImage, setProfileImage] = useState(profile.profileImage);

  const backgroundColor = isDarkMode ? '#121212' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#121212';

  // If the user came from login with a name (via route), you might set it here
  // useEffect(() => {
  //   if(route.params?.name){
  //     setName(route.params.name);
  //   }
  // }, [route.params]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access photo library is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  const handleDone = () => {
    // Save updated profile data into context
    updateProfile({ name, email, phone, profileImage });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: textColor }]}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Profile image with edit overlay */}
        <TouchableOpacity onPress={pickImage} style={styles.profileImageWrapper}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-circle" size={120} color={textColor} />
          )}
          <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
            <Ionicons name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
        
        {/* Input fields */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: textColor }]}>Name</Text>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: '#ccc', backgroundColor: isDarkMode ? '#1E1E1E' : '#f9f9f9' }]}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: textColor }]}>Email</Text>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: '#ccc', backgroundColor: isDarkMode ? '#1E1E1E' : '#f9f9f9' }]}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: textColor }]}>Phone Number</Text>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: '#ccc', backgroundColor: isDarkMode ? '#1E1E1E' : '#f9f9f9' }]}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
            keyboardType="phone-pad"
          />
        </View>
        <TouchableOpacity style={[styles.doneButton, { backgroundColor: '#6200EE' }]} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  backButton: { padding: 10 },
  headerTitle: { 
    flex: 1, 
    textAlign: 'center', 
    fontSize: 24, 
    fontWeight: '600' 
  },
  headerSpacer: { width: 44 },
  content: { 
    flex: 1, 
    alignItems: 'center',
    width: '100%',
  },
  profileImageWrapper: {
    marginBottom: 30,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6200EE',
    borderRadius: 12,
    padding: 4,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  doneButton: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignSelf: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
