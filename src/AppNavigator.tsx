import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EnterNameScreen from './screens/EnterNameScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MainMenuScreen from './screens/MainMenuScreen';

import LoginScreen from './screens/LoginScreen';
import AddChildScreen from './screens/AddChildScreen';
import ParentZoneScreen from './screens/ParentZoneScreen';

import MathScreen from './screens/MathScreen';
import LessonScreen from './screens/LessonScreen';
import PracticeScreen from './screens/PracticeScreen';
import TestScreen from './screens/TestScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* Bắt đầu luồng app */}
        <Stack.Screen name="EnterName" component={EnterNameScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />

        {/* Các module học */}
        <Stack.Screen name="Math" component={MathScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="Practice" component={PracticeScreen} />
        <Stack.Screen name="Test" component={TestScreen} />

        {/* Phụ huynh */}
        <Stack.Screen name="ParentZone" component={ParentZoneScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AddChild" component={AddChildScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
