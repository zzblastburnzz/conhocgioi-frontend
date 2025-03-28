import axios from 'axios';

export const grantReward = async ({
  phone,
  childIndex = 0,
  type = 'stickers',
  reward = 'star'
}) => {
  try {
    await axios.patch('https://conhocgioi-api.onrender.com/unlock-reward', {
      phone,
      childIndex,
      rewardType: type,
      reward
    });
    console.log('✅ Đã tặng thưởng:', reward);
  } catch (error) {
    console.error('❌ Lỗi khi tặng thưởng:', error);
  }
};
