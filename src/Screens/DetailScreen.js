import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Header from '../Components/Header.js';
import Icon from 'react-native-vector-icons/Ionicons';

export default class DetailScreen extends Component {
    render() {
        return (
            <View>
                <Header title='Details Screen' color='#F3B431' />
                <TouchableOpacity style={{ position: 'absolute', top: 37, left: 20 }} onPress={() => this.props.navigation.openDrawer()}>
                    <Icon name='ios-menu' size={40} color='#fff' />
                </TouchableOpacity>
                <Text> Detail Screen </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
