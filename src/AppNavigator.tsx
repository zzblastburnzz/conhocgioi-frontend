import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EnterNameScreen from './screens/EnterNameScreen';
import WelcomeBonScreen from './screens/WelcomeBonScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import MathScreen from './screens/MathScreen';
import AlphabetScreen from './screens/AlphabetScreen';
import SyllableScreen from './screens/SyllableScreen';
import PracticeScreen from './screens/PracticeScreen';
import ParentZoneScreen from './screens/ParentZoneScreen';
import LoginScreen from './screens/LoginScreen';
import AddChildScreen from './screens/AddChildScreen';
import RewardScreen from './screens/RewardScreen';
import CollectionScreen from './screens/CollectionScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="EnterName" component={EnterNameScreen} />
        <Stack.Screen name="WelcomeBon" component={WelcomeBonScreen} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="Math" component={MathScreen} />
        <Stack.Screen name="Alphabet" component={AlphabetScreen} />
        <Stack.Screen name="Syllable" component={SyllableScreen} />
        <Stack.Screen name="Practice" component={PracticeScreen} />
        <Stack.Screen name="ParentZone" component={ParentZoneScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AddChild" component={AddChildScreen} />
        <Stack.Screen name="Reward" component={RewardScreen} />
        <Stack.Screen name="Collection" component={CollectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
