// src/screens/WelcomeBonScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeBonScreen() {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('childName').then((value) => {
      if (value) setName(value);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/bon/happy.webp')} style={styles.bonImage} />
      <Text style={styles.greeting}>Xin chào {name}!</Text>
      <Text style={styles.text}>
        Tớ là <Text style={{ fontWeight: 'bold' }}>Bon</Text> – bạn đồng hành học tập của bạn!
        {'\n'}Chúng ta cùng học thật vui nhé!
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainMenu')}>
        <Text style={styles.buttonText}>Bắt đầu học</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  bonImage: { width: 180, height: 180, resizeMode: 'contain', marginBottom: 20 },
  greeting: { fontSize: 24, fontWeight: 'bold' },
  text: { fontSize: 18, textAlign: 'center', marginVertical: 12 },
  button: {
    marginTop: 20,
    backgroundColor: '#28c76f',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10
  },
  buttonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' }
});
