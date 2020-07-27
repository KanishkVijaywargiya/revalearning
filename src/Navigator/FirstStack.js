import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../Screens/HomeScreen.js';
import DetailScreen from '../Screens/DetailScreen.js';

const Stack = createStackNavigator();

export default FirstStack = ({ navigation }) => (
    <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{
                title: 'Home',
                headerShown: false,
            }}
        />
        <Stack.Screen
            name='DetailScreen'
            component={DetailScreen}
            options={{
                title: 'Detail',
                headerShown: false,
            }}
        />
    </Stack.Navigator>
)
