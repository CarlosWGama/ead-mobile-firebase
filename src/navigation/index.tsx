import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/login';
import { HomeScreen } from '../screens/home';

const Stack = createStackNavigator();

export const MainNavigation = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="home" component={HomeScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)