import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import AddChildScreen from './screens/AddChildScreen';
import EnterNameScreen from './screens/EnterNameScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import MathScreen from './screens/MathScreen';
import LessonScreen from './screens/LessonScreen';
import PracticeScreen from './screens/PracticeScreen';
import ParentZoneScreen from './screens/ParentZoneScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* Mở app sẽ vào màn nhập tên */}
        <Stack.Screen name="EnterName" component={EnterNameScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />

        {/* Menu chính và các module học */}
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="Math" component={MathScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="Practice" component={PracticeScreen} />

        {/* Khu phụ huynh */}
        <Stack.Screen name="ParentZone" component={ParentZoneScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AddChild" component={AddChildScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
