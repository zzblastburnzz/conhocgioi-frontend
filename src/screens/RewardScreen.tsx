import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Demo dữ liệu sticker
const rewards = [
  { id: '1', name: 'Sao xanh', color: 'green', unlocked: true, image: require('../assets/stickers/star.png') },
  { id: '2', name: 'Bong bóng', color: 'green', unlocked: false, image: require('../assets/stickers/balloon.png') },

  { id: '3', name: 'Hoa lam', color: 'blue', unlocked: true, image: require('../assets/stickers/flower.png') },
  { id: '4', name: 'Cánh chim', color: 'blue', unlocked: false, image: require('../assets/stickers/bird.png') },

  { id: '5', name: 'Kỳ lân', color: 'purple', unlocked: false, image: require('../assets/stickers/unicorn.png') },

  { id: '6', name: 'Vương miện vàng', color: 'gold', unlocked: false, image: require('../assets/stickers/crown.png') },
];

// Nhóm sticker theo cấp độ
const groupByColor = (color: string) =>
  rewards.filter((item) => item.color === color);

const colorLabel = {
  green: '🟢 Dễ',
  blue: '🔵 Trung bình',
  purple: '🟣 Khó',
  gold: '🟡 Rất khó'
};

export default function RewardScreen() {
  return (
    <FlatList
      ListHeaderComponent={<Text style={styles.title}>Bộ sưu tập Sticker 🎁</Text>}
      data={['green', 'blue', 'purple', 'gold']}
      keyExtractor={(item) => item}
      renderItem={({ item: color }) => (
        <View style={styles.group}>
          <Text style={styles.groupTitle}>{colorLabel[color]}</Text>
          <View style={styles.row}>
            {groupByColor(color).map((reward) => (
              <TouchableOpacity key={reward.id} disabled={!reward.unlocked}>
                <Image
                  source={reward.image}
                  style={[
                    styles.sticker,
                    !reward.unlocked && { opacity: 0.2 }
                  ]}
                />
                <Text style={styles.stickerLabel}>{reward.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 20, marginBottom: 10
  },
  group: {
    marginBottom: 20, paddingHorizontal: 16
  },
  groupTitle: {
    fontSize: 18, fontWeight: '600', marginBottom: 10
  },
  row: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 12
  },
  sticker: {
    width: 80, height: 80, resizeMode: 'contain', marginBottom: 6
  },
  stickerLabel: {
    fontSize: 14, textAlign: 'center', width: 80
  }
});
