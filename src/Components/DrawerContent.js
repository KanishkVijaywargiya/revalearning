import React, { Component, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';

import * as firebase from 'firebase';
import 'firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

import RNRestart from 'react-native-restart';

function mapDispatchToProps(dispatch) {
    return {
        updateUid: (uid) => dispatch({ type: 'UPDATE_UID', uid }),
        updateName: (name) => dispatch({ type: 'UPDATE_NAME', name }),
        updateEmail: (email) => dispatch({ type: 'UPDATE_EMAIL', email }),
    }
}

export const DrawerContent = (props) => {

    signOut = () => {
        firebase.auth().signOut();
        setTimeout(() => { RNRestart.Restart() }, 1000);
        AsyncStorage.clear();
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{ uri: 'https://cdn.dribbble.com/users/119484/screenshots/2631699/drib.jpg' }}
                                size={50}
                                style={{ borderColor: '#121212', borderWidth: 5, justifyContent: 'center', alignItems: 'center' }}
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Title style={styles.title}>{props.name}</Title>
                                <Caption style={styles.caption}>{props.username}</Caption>
                            </View>
                        </View>
                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem icon={({ color, size }) => (
                                <Icon
                                    name='account-outline'
                                    color={color}
                                    size={size}
                                />
                            )}
                                label='Home'
                                onPress={() => props.navigation.navigate('HomeScreen')}
                            />
                            <DrawerItem icon={({ color, size }) => (
                                <Icon
                                    name='account-outline'
                                    color={color}
                                    size={size}
                                />
                            )}
                                label='Detail'
                                onPress={() => props.navigation.navigate('DetailScreen')}
                            />
                        </Drawer.Section>
                    </View>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem icon={({ color, size }) => (
                    <Icon
                        name='exit-to-app'
                        color={color}
                        size={size}
                    />
                )}
                    label='Sign Out'
                    onPress={() => this.signOut()}
                />
            </Drawer.Section>
        </View>
    )
}
//export default (null, mapDispatchToProps)(DrawerContent);

const styles = StyleSheet.create({
    drawerContent: { flex: 1 },
    userInfoSection: { paddingLeft: 20 },
    title: { fontSize: 16, marginTop: 3, fontWeight: 'bold' },
    caption: { fontSize: 14, lineHeight: 14 },
    drawerSection: { marginTop: 15 },
    preferences: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center' },
    bottomDrawerSection: { marginBottom: 15, borderTopColor: '#F4F4F4', borderTopWidth: 1 },
})
