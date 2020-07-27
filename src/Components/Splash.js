import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Platform } from 'react-native'
import LottieView from 'lottie-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Splash = props => (
    <View style={{ flex: 1, alignItems: 'center', }}>
        <Text style={{ color: '#DE834D', fontWeight: 'bold', marginTop: 80, fontSize: Platform.OS === 'ios' ? hp('4.5%') : hp('4.5%') }}>
            REVA
            <Text style={{ color: '#121212', fontWeight: 'bold', marginTop: 80, fontSize: Platform.OS === 'ios' ? hp('4.5%') : hp('4.5%') }}> E - Shiksha</Text>
        </Text>
        <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
            <LottieView style={{ width: hp('75%'), height: hp('75%'), }} source={require('../assets/lottieJson/books.json')} autoPlay loop />
        </View>
    </View>
)
export default Splash;
