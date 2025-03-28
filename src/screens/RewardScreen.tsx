import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { getPhone } from '../utils/session';

const stickerImages = {
  star: require('../assets/stickers/star.png'),
  banana: require('../assets/stickers/banana.png'),
  'math-star': require('../assets/stickers/math-star.png'),
};

const skinImages = {
  'bon-doctor': require('../assets/skins/bon-doctor.webp'),
  'bon-superman': require('../assets/skins/bon-superman.webp'),
};

const RewardScreen = () => {
  const [rewards, setRewards] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRewards = async () => {
    const phone = await getPhone();
    if (!phone) return;

    try {
      const res = await axios.get('https://conhocgioi-api.onrender.com/get-parent-info', {
        params: { phone }
      });

      const child = res.data.children?.[0];
      if (child?.rewards) setRewards(child.rewards);
    } catch (err) {
      console.error('Lỗi tải reward:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎁 Bộ Sưu Tập Của Bé</Text>

      <Text style={styles.section}>⭐ Sao tích lũy</Text>
      <Text style={styles.count}>{rewards?.stars || 0} ⭐</Text>

      <Text style={styles.section}>📦 Sticker đã mở</Text>
      <View style={styles.row}>
        {rewards?.stickers?.map((s, i) => (
          <Image key={i} source={stickerImages[s]} style={styles.icon} />
        ))}
      </View>

      <Text style={styles.section}>🧸 Skin Bon đã sở hữu</Text>
      <View style={styles.row}>
        {rewards?.unlockedSkins?.map((s, i) => (
          <Image key={i} source={skinImages[s]} style={[styles.icon, { borderRadius: 12 }]} />
        ))}
      </View>
    </ScrollView>
  );
};

export default RewardScreen;

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  section: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 8 },
  count: { fontSize: 24, color: '#e67e22' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  icon: { width: 60, height: 60, margin: 6 }
});
