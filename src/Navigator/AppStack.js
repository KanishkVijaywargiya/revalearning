import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { firebaseConfig } from '../Config/Config.js';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../Components/DrawerContent.js';

import Splash from '../Components/Splash.js';
import FirstStack from '../Navigator/FirstStack.js';
import DetailScreen from '../Screens/DetailScreen.js';
import RootStackScreens from '../Navigator/RootStackScreen.js';

const Drawer = createDrawerNavigator();

const mapStateToProps = state => {
    return {
        uid: state.uid,
        fullName: state.fullName,
        email: state.email,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateUid: (uid) => dispatch({ type: 'UPDATE_UID', uid }),
        updateName: (fullName) => dispatch({ type: 'UPDATE_NAME', fullName }),
        updateEmail: (email) => dispatch({ type: 'UPDATE_EMAIL', email }),
        dispatch
    }
}

class App extends Component {

    state = {
        showsplash: true,
        token: '',
        fullName: '',
        email: '',
        uidData: ''
    }

    DrawerNavigatorScreens = (email) => {
        return (
            <Drawer.Navigator initialRouteName='Home' drawerContent={props => <DrawerContent {...props} name={'abc'} username={'abc@gmail.com'} />}>
                <Drawer.Screen name='Home' component={FirstStack} />
                <Drawer.Screen name='Detail' component={DetailScreen} />
            </Drawer.Navigator>
        )
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                showsplash: false
            })
        }, 2000);
    }

    componentWillMount() {
        this.checkIfLoggedIn()

        this.DrawerNavigatorScreens(this.state.uidData)
    }

    checkIfLoggedIn = async () => {

        this.unsubscribe = await firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const value = AsyncStorage.getItem('uid')
                console.log("VALUEQWE::", value);
                if (value !== null) {
                    this.setState({
                        uidData: value
                    })
                }
                console.log("STATE::", this.state.uidData);
                if (this.state.uidData !== null) {
                    this.props.updateUid(this.state.uidData)
                }
                console.log("MORE Data::", this.state.email,);
            } else {

            }
        });
    };
    componentWillUnmount() {
        this.unsubscribe();
    }

    constructor() {
        super();
        this.initializeFirebase();
    }
    initializeFirebase = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    };

    render() {
        if (this.state.showsplash) {
            return (<Splash />)
        }
        return (
            <NavigationContainer>
                {this.state.uidData ? this.DrawerNavigatorScreens() : <RootStackScreens />}
            </NavigationContainer>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)