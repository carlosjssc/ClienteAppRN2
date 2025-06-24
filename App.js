import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import ListScreen from './src/screens/ListScreen';
import DetailScreen from './src/screens/DetailScreen';
import LocalListScreen from './src/screens/LocalListScreen';

const Stack = createNativeStackNavigator();

const colors = {
  primary: '#005A9C',
  background: '#F0F2F5',
  text: '#333',
  headerText: '#FFFFFF',
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.headerText,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Consulta CNAE' }} />
        <Stack.Screen name="List" component={ListScreen} options={{ title: 'Classes CNAE (API)' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalhes da Classe' }} />
        <Stack.Screen name="LocalList" component={LocalListScreen} options={{ title: 'Classes Salvas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}