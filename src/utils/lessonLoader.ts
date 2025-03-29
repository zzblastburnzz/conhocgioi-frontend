import * as FileSystem from 'expo-file-system';

export const loadLessonData = async (filename: string) => {
  try {
    const path = require(`../assets/data/toan/${filename}`);
    const response = await fetch(path);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi load file:", filename, error);
    return [];
  }
};
