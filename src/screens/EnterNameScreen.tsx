// src/screens/EnterNameScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function EnterNameScreen() {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Vui lòng nhập tên bé nhé!');
      return;
    }
    await AsyncStorage.setItem('childName', name.trim());
    navigation.navigate('WelcomeBon');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào bạn! Bạn tên là gì nhỉ?</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên của bạn..."
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Vào học nào!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 10,
    fontSize: 18, backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#ffc107',
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: { fontSize: 18, fontWeight: 'bold' }
});
