import AsyncStorage from '@react-native-async-storage/async-storage';

export type ProgressType = {
  [subject: string]: number;
};

const STORAGE_KEY = (childName: string) => `progress_${childName.toLowerCase()}`;

export const updateProgress = async (childName: string, subject: string) => {
  try {
    const key = STORAGE_KEY(childName);
    const existing = await AsyncStorage.getItem(key);
    const progress: ProgressType = existing ? JSON.parse(existing) : {};

    progress[subject] = (progress[subject] || 0) + 1;

    await AsyncStorage.setItem(key, JSON.stringify(progress));
  } catch (err) {
    console.error('updateProgress error:', err);
  }
};

export const getProgress = async (childName: string): Promise<ProgressType> => {
  try {
    const key = STORAGE_KEY(childName);
    const stored = await AsyncStorage.getItem(key);
    return stored ? JSON.parse(stored) : {};
  } catch (err) {
    console.error('getProgress error:', err);
    return {};
  }
};
