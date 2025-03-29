import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Switch, Image } from 'react-native';
import * as Speech from 'expo-speech';

// Ghép vần cơ bản
const initials = ['b', 'c', 'd', 'đ', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'x'];
const finals = ['a', 'ai', 'an', 'ang', 'ao', 'ă', 'ăc', 'ăm', 'ăn', 'â', 'âm', 'ân', 'ê', 'ên', 'i', 'ia', 'iê', 'o', 'oa', 'oe', 'ô', 'ơ', 'u', 'ua', 'ư', 'ươ', 'y'];

// Dữ liệu tiếng có nghĩa (demo)
const vocabulary = [
  { word: 'bò', image: '🐄', initial: 'b', final: 'ò' },
  { word: 'cá', image: '🐟', initial: 'c', final: 'á' },
  { word: 'cờ', image: '🚩', initial: 'c', final: 'ờ' },
  { word: 'xe', image: '🚗', initial: 'x', final: 'e' },
  { word: 'mèo', image: '🐱', initial: 'm', final: 'eo' }
];

export default function GhepVanScreen() {
  const [selected, setSelected] = useState<{ initial: string; final: string } | null>(null);
  const [imageMode, setImageMode] = useState(false);
  const [vocabIndex, setVocabIndex] = useState(0);

  const getWord = () => selected ? selected.initial + selected.final : '';

  const speakWord = (word: string) => {
    Speech.speak(word, { language: 'vi-VN' });
  };

  const currentVocab = vocabulary[vocabIndex];

  return (
    <View style={styles.container}>
      <View style={styles.modeSwitch}>
        <Text style={styles.modeLabel}>🧸 Học qua hình ảnh</Text>
        <Switch value={imageMode} onValueChange={setImageMode} />
      </View>

      {!imageMode ? (
        <>
          <Text style={styles.title}>Ghép vần cơ bản</Text>
          <FlatList
            data={initials}
            keyExtractor={(item) => item}
            renderItem={({ item: initial }) => (
              <View style={styles.row}>
                {finals.map((final) => {
                  const word = initial + final;
                  const isSelected =
                    selected?.initial === initial && selected?.final === final;

                  return (
                    <TouchableOpacity
                      key={final}
                      style={[styles.cell, isSelected && styles.selected]}
                      onPress={() => {
                        setSelected({ initial, final });
                        speakWord(word);
                      }}
                    >
                      <Text style={styles.cellText}>{word}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          />

          {selected && (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>Bạn vừa ghép: {getWord()}</Text>
            </View>
          )}
        </>
      ) : (
        <View style={styles.imageModeContainer}>
          <Text style={styles.title}>🧸 Học tiếng có nghĩa</Text>
          <Text style={styles.flashcardEmoji}>{currentVocab.image}</Text>
          <Text style={styles.word}>{currentVocab.word}</Text>
          <Text style={styles.split}>
            {currentVocab.initial} + {currentVocab.final}
          </Text>
          <TouchableOpacity
            style={styles.speakButton}
            onPress={() => {
              speakWord(currentVocab.initial);
              setTimeout(() => speakWord(currentVocab.final), 500);
              setTimeout(() => speakWord(currentVocab.word), 1200);
            }}
          >
            <Text style={styles.speakText}>🔊 Nghe từ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() =>
              setVocabIndex((prev) => (prev + 1) % vocabulary.length)
            }
          >
            <Text style={styles.nextText}>➡️ Tiếp theo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 10 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6
  },
  cell: {
    backgroundColor: '#fef4d3',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    margin: 3
  },
  selected: {
    backgroundColor: '#ffd966'
  },
  cellText: { fontSize: 16, fontWeight: '600' },
  resultBox: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff9d6',
    padding: 16,
    borderRadius: 10
  },
  resultText: { fontSize: 20, fontWeight: 'bold' },
  modeSwitch: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
    paddingRight: 10
  },
  modeLabel: { marginRight: 8, fontSize: 16 },
  imageModeContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12
  },
  flashcardEmoji: { fontSize: 100 },
  word: { fontSize: 32, fontWeight: 'bold' },
  split: { fontSize: 22, color: '#444' },
  speakButton: {
    backgroundColor: '#28c76f',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  speakText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  nextButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#aaa'
  },
  nextText: { fontSize: 16 }
});
