import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const GridImage = ({ image, width, bgColor, text, border, para, pushTo }) => {
    return (
        <View style={{
            backgroundColor: '#000',
            width: width,
            height: width,
            marginVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 10,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 2
        }}>
            <Image source={image} style={{ height: hp('7.5%'), width: hp('7.5%') }} />
            <Text style={{ color: '#000', fontWeight: '600', marginTop: 5, justifyContent: 'center', alignSelf: 'center' }}> {text}</Text>
            <Text style={{ color: '#B8BECE', fontWeight: '400', marginTop: 5, justifyContent: 'center', alignSelf: 'center' }}> {para}</Text>
        </View>
    )
}
export default GridImage;