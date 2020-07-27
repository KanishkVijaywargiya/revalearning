import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, SafeAreaView, Dimensions, Keyboard, TextInput, Alert, Platform, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
    return {
        updateUid: (uid) => dispatch({ type: 'UPDATE_UID', uid }),
        updateEmail: (email) => dispatch({ type: 'UPDATE_EMAIL', email }),
    }
}

class Login extends Component {
    state = {
        email: '',
        password: '',
    }
    storeData = async (uidtoken, fullName, email) => {
        try {
            await AsyncStorage.setItem("uid", uidtoken)

            console.log("ASyncStorageData::", AsyncStorage.getAllKeys());
        } catch (e) {
            // saving error
        }
    }
    onSignIn = async () => {
        console.log("DATA: ", this.state.email, this.state.password);
        const email = this.state.email
        const password = this.state.password
        if (email && password) {
            this.setState({ isSuccessful: true })
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch((error) => {
                    Alert.alert("Error", error.message)
                    Keyboard.dismiss();
                })
                .then(response => {
                    Keyboard.dismiss()
                    if (response) {
                        console.log("RESPONSE aaja:: ", response);
                        this.storeData(response.user.uid, response.user.email);
                        this.props.updateUid(response.user.uid);
                        this.props.updateEmail(response.user.email)
                        this.setState({ email: '', password: '' });
                    }
                })
        } else {
            Alert.alert("Please fill the details.....!")
        }
    };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <KeyboardAwareScrollView>
                    <SafeAreaView>
                        <View style={{ height: Platform.OS === 'ios' ? hp('23%') : hp('35%'), alignItems: 'center' }}>
                            <Image source={require('../assets/loginlogo/logo.png')} />
                        </View>
                        <View style={{ alignItems: 'center', marginTop: Platform.OS === 'ios' ? hp('5%') : hp('0.5%') }}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Welcome</Text>
                            <Text style={{ fontSize: 12, fontWeight: '500', color: '#121212' }}>Log in to your existed account of REVA E-Shiksha</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Platform.OS === 'ios' ? hp('3%') : hp('3%'), height: Platform.OS === 'ios' ? hp('6.5%') : hp('8%'), borderRadius: 30, borderWidth: 1, borderColor: '#53E0BC', alignSelf: 'center', width: Dimensions.get('window').width - 30 }}>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <Icon name='ios-mail' size={30} color='#53E0BC' />
                            </View>
                            <TextInput style={{ flex: 0.8, fontSize: 22, color: '#53E0BC' }}
                                autocapitalize='none'
                                placeholder='Email'
                                placeholderTextColor="#3C4560"
                                keyboardType='email-address'
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                                opacity={0.5}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Platform.OS === 'ios' ? hp('3%') : hp('3%'), height: Platform.OS === 'ios' ? hp('6.5%') : hp('8%'), borderRadius: 30, borderWidth: 1, borderColor: '#53E0BC', alignSelf: 'center', width: Dimensions.get('window').width - 30 }}>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <Icon name='lock-closed' size={30} color='#53E0BC' />
                            </View>
                            <TextInput style={{ flex: 0.8, fontSize: 22, color: '#53E0BC' }}
                                autocapitalize='none'
                                placeholder='Password'
                                placeholderTextColor="#3C4560"
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                                secureTextEntry
                                opacity={0.5}
                            />
                        </View>
                        <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: Platform.OS === 'ios' ? hp('5%') : hp('3%'), height: 50, width: Dimensions.get('window').width }}>
                            <TouchableOpacity onPress={() => this.onSignIn()}>
                                <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: '#53E0BC', height: 50, borderRadius: 25, borderWidth: 1, borderColor: '#53E0BC', width: Dimensions.get('window').width - 250, shadowColor: '#53E0BC', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 1 }}>
                                    <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>LOG IN</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {Platform.OS === 'android' ?
                            <View style={{ alignItems: 'center', paddingLeft: 20, flexDirection: 'row', justifyContent: 'center', bottom: 2, marginTop: hp('1%') }}>
                                <Text style={{ color: '#121212', fontSize: 16 }}>Don't have an account? </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                                    <Text style={{ color: '#53E0BC', fontSize: 16, fontWeight: '700' }}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            null
                        }
                    </SafeAreaView>
                </KeyboardAwareScrollView>
                {Platform.OS === 'ios' ?
                    <View style={{ position: 'absolute', alignItems: 'center', paddingLeft: 20, bottom: 30, right: 0, left: 0, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: '#121212', fontSize: 16 }}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                            <Text style={{ color: '#53E0BC', fontSize: 16, fontWeight: '700' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    null
                }
            </View >
        )
    }
}
export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({})
