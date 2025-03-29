import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getProgress } from '../utils/progress';

const TOTAL_QUESTIONS: { [subject: string]: number } = {
  Toán: 3,
  'Chữ cái': 29,
  'Ghép vần': 10,
  'Luyện tập': 3
};

export default function ParentZoneScreen() {
  const [progress, setProgress] = useState<{ subject: string; done: number; total: number }[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getProgress('Bon');
      const formatted = Object.entries(TOTAL_QUESTIONS).map(([subject, total]) => ({
        subject,
        total,
        done: data[subject] || 0
      }));
      setProgress(formatted);
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Khu vực phụ huynh</Text>
      <Text style={styles.childName}>👶 Bé: Bon (5 tuổi)</Text>

      <FlatList
        data={progress}
        keyExtractor={(item) => item.subject}
        renderItem={({ item }) => (
          <View style={styles.progressItem}>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.percent}>
              {item.done}/{item.total} bài ({Math.round((item.done / item.total) * 100)}%)
            </Text>
          </View>
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  childName: { fontSize: 18, marginTop: 10, textAlign: 'center' },
  progressItem: {
    backgroundColor: '#fef4d3',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10
  },
  subject: { fontSize: 18, fontWeight: 'bold' },
  percent: { fontSize: 16, color: '#333' }
});
