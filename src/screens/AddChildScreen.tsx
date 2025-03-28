import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function AddChildScreen({ navigation }) {
  const [childName, setChildName] = useState('');

  const handleNext = () => {
    if (childName.trim() === '') return;
    navigation.navigate('HomeTabs');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập tên bé:</Text>
      <TextInput
        placeholder="Tên bé"
        value={childName}
        onChangeText={setChildName}
        style={styles.input}
      />
      <Button title="Bắt đầu học" onPress={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  title: { fontSize: 22, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 20
  }
});
