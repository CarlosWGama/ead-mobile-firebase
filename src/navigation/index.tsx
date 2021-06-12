import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/login';
import { HomeScreen } from '../screens/home';
import { View } from 'react-native';
import firebase from 'firebase';

const Stack = createStackNavigator();

const Initial = () => {

    const nav = useNavigation();
    firebase.auth().onAuthStateChanged(user => {
        nav.navigate((user ? 'home' : 'login'))
    })

    return (<View/>)
}


export const MainNavigation = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="initial" component={Initial} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="home" component={HomeScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)