import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const rewards = [
  { id: '1', name: 'Sao xanh', unlocked: true, image: require('../assets/stickers/star.png') },
  { id: '2', name: 'Bong bóng', unlocked: false, image: require('../assets/stickers/balloon.png') },
  { id: '3', name: 'Hoa lam', unlocked: true, image: require('../assets/stickers/flower.png') },
  { id: '4', name: 'Cánh chim', unlocked: false, image: require('../assets/stickers/bird.png') },
  { id: '5', name: 'Kỳ lân', unlocked: false, image: require('../assets/stickers/unicorn.png') },
  { id: '6', name: 'Vương miện vàng', unlocked: true, image: require('../assets/stickers/crown.png') }
];

export default function CollectionScreen() {
  const unlocked = rewards.filter((r) => r.unlocked);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sticker của bé 🌟</Text>
      {unlocked.length === 0 ? (
        <Text style={styles.note}>Bé chưa nhận được sticker nào 🥲</Text>
      ) : (
        <FlatList
          data={unlocked}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={item.image} style={styles.sticker} />
              <Text style={styles.label}>{item.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  note: { textAlign: 'center', color: '#999' },
  grid: { alignItems: 'center' },
  item: { alignItems: 'center', margin: 10 },
  sticker: { width: 80, height: 80, resizeMode: 'contain' },
  label: { marginTop: 6, fontSize: 14 }
});
