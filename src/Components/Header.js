import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Header = props => (
    <View style={{ height: Platform.OS === 'ios' ? 80 : hp('8%'), flexDirection: 'row', backgroundColor: props.color }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ paddingTop: Platform.OS === 'ios' ? 30 : 0, fontSize: 20, fontWeight: 'bold', color: '#fff' }}>{props.title}</Text>
        </View>
    </View>
)
export default Header;