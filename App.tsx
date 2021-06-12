import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MainNavigation } from './src/navigation';
import firebase from 'firebase';
import { firebaseConfig } from './src/configs/firebase';

firebase.initializeApp(firebaseConfig)

export default function App() {
  return (
    <MainNavigation />
  );
}
