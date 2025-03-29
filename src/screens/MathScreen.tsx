import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const mathTopics = [
  { title: 'Phép cộng', file: 'addition.json' },
  { title: 'Phép trừ', file: 'subtraction.json' },
  { title: 'So sánh số', file: 'comparison.json' },
  { title: 'Tìm quy luật', file: 'pattern.json' },
  { title: 'Sắp xếp số', file: 'arrange.json' },
  { title: 'Tìm số còn thiếu', file: 'find-missing.json' },
  { title: 'Cao – thấp – to – nhỏ', file: 'height.json' },
  { title: 'Trái – phải – trước – sau', file: 'position.json' },
  { title: 'Đếm số lượng', file: 'counting.json' },
  { title: 'So sánh số lượng', file: 'quantity-compare.json' },
];

const MathScreen = () => {
  const navigation = useNavigation<any>();

  const goToLesson = (file: string, title: string) => {
    navigation.navigate('Lesson', { fileName: file, title });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🧠 Các chủ đề Toán học</Text>
      {mathTopics.map((topic, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => goToLesson(topic.file, topic.title)}
        >
          <Text style={styles.cardText}>{topic.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default MathScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#FFD580',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4B3F2F',
  },
});
