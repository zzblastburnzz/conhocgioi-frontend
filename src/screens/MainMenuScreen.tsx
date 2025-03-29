import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainMenuScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bạn muốn học gì hôm nay?</Text>

      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Math')}>
        <Text style={styles.menuText}>📚 Toán học</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Practice')}>
        <Text style={styles.menuText}>📝 Luyện tập</Text>
      </TouchableOpacity>

      {/* Các module chữ cái, ghép vần, bài kiểm tra thêm sau */}
      
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('ParentZone')}>
        <Text style={styles.menuText}>👨‍👩‍👧 Dành cho phụ huynh</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainMenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  menuButton: {
    backgroundColor: '#FFD580',
    padding: 20,
    borderRadius: 16,
    marginVertical: 12,
    alignItems: 'center',
  },
  menuText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
