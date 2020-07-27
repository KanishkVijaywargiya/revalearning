import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Login from '../Screens/Login.js';
import SignUp from '../Screens/SignUp.js';

const RootStack = createStackNavigator();

const RootStackScreens = ({ navigation }) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen
            name='Login'
            component={Login}
        />
        <RootStack.Screen
            name='SignUp'
            component={SignUp}
        />
    </RootStack.Navigator>
)
export default RootStackScreens;