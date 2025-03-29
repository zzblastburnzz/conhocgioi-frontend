import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function MainMenuScreen() {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('childName').then((value) => {
      if (value) setName(value);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/bon/thinking.webp')} style={styles.bonImage} />
      <Text style={styles.title}>Bạn muốn học gì hôm nay{ name ? `, ${name}` : ''}?</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Math')}>
        <Text style={styles.buttonText}>🧮 Toán học</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Alphabet')}>
        <Text style={styles.buttonText}>🔤 Chữ cái</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Syllable')}>
        <Text style={styles.buttonText}>✍️ Ghép vần</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Practice')}>
        <Text style={styles.buttonText}>✅ Luyện tập</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.subBtn} onPress={() => navigation.navigate('ParentZone')}>
        <Text style={styles.subText}>👨‍👩‍👧 Dành cho phụ huynh</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.subBtn} onPress={() => navigation.navigate('Collection')}>
        <Text style={styles.subText}>🧺 Bộ sưu tập của bé</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  button: {
    backgroundColor: '#fef4d3',
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginVertical: 8,
    borderRadius: 14,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  buttonText: { fontSize: 18, fontWeight: '600' },
  bonImage: { width: 150, height: 150, marginBottom: 16 },
  subBtn: { marginTop: 12 },
  subText: { color: '#007AFF', fontSize: 16, fontWeight: '600' }
});
