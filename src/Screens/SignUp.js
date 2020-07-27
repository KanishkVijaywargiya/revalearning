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

function mapStateToProps(state) {
    return {
        uid: state.uid,
        fullName: state.fullName,
        email: state.email,
        phone: state.phone
    }
}
function mapDispatchToProps(dispatch) {
    return {
        updateUid: (uid) => dispatch({ type: 'UPDATE_UID', uid }),
        updateName: (fullName) => dispatch({ type: 'UPDATE_NAME', fullName }),
        updateEmail: (email) => dispatch({ type: 'UPDATE_EMAIL', email }),
    }
}

class SignUp extends Component {
    state = {
        fullName: '',
        email: '',
        password: '',
        conformPassword: '',
        token: ""
    }
    retrieveUid = async () => {
        try {
            const uids = await AsyncStorage.getItem("uid")
            if (uids !== null) {
                console.log("UID IS:", uids)
                this.setState({ token: uids })
                this.props.updateUid(uids)
            }
        } catch (error) {
            console.log(error);
        }
    }
    storeData = async (uidtoken, fullName, email) => {
        try {
            await AsyncStorage.setItem("uid", uidtoken)
            await AsyncStorage.setItem("name", fullName)
            await AsyncStorage.setItem("emails", email)
            console.log("ASyncStorageData::", AsyncStorage.getAllKeys());
        } catch (e) {
            // saving error
        }
    }
    onSignUp = async () => {
        console.log("DATA: ", this.state.email, this.state.password, this.state.fullName, this.state.conformPassword);
        const fullName = this.state.fullName
        const email = this.state.email
        const password = this.state.password
        const conformPassword = this.state.conformPassword
        if (email && password && fullName && conformPassword) {
            if (password == conformPassword) {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .catch((error) => {
                        Alert.alert("Error", error.message)
                        Keyboard.dismiss();
                    })
                    .then(response => {
                        Keyboard.dismiss()
                        console.log("RESPONSE", response);

                        const user = firebase.database().ref('users/').child(response.user.uid).set({ email: response.user.email, uid: response.user.uid, fullName: this.state.fullName });

                        this.storeData(response.user.uid, this.state.fullName, response.user.email)
                        this.props.updateUid(response.user.uid)
                        this.props.updateEmail(response.user.email)
                        this.props.updateName(this.state.fullName)
                        this.setState({ fullName: '', email: '', password: '', conformPassword: '' });
                    })
            } else {
                Alert.alert("Please Check you Password.....!")
            }
        } else {
            Alert.alert("Please fill the details.....!")
        }
    };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <KeyboardAwareScrollView>
                    <SafeAreaView>
                        <View style={{ alignItems: 'center', marginTop: Platform.OS === 'ios' ? hp('3%') : hp('5%') }}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Let's Get Started!</Text>
                            <Text style={{ fontSize: 12, fontWeight: '500', color: '#121212' }}>Create an account to REVA E-Shiksha to get all features</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Platform.OS === 'ios' ? hp('5%') : hp('3%'), height: Platform.OS === 'ios' ? hp('6.5%') : hp('8%'), borderRadius: 30, borderWidth: 1, borderColor: '#53E0BC', alignSelf: 'center', width: Dimensions.get('window').width - 30 }}>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <Icon name='ios-person' size={30} color='#53E0BC' />
                            </View>
                            <TextInput style={{ flex: 0.8, fontSize: 22, color: '#53E0BC' }}
                                autocapitalize='none'
                                placeholder='Full name'
                                placeholderTextColor="#3C4560"
                                opacity={0.5}
                                onChangeText={fullName => this.setState({ fullName })}
                                value={this.state.fullName}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Platform.OS === 'ios' ? hp('5%') : hp('3%'), height: Platform.OS === 'ios' ? hp('6.5%') : hp('8%'), borderRadius: 30, borderWidth: 1, borderColor: '#53E0BC', alignSelf: 'center', width: Dimensions.get('window').width - 30 }}>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <Icon name='ios-mail' size={30} color='#53E0BC' />
                            </View>
                            <TextInput style={{ flex: 0.8, fontSize: 22, color: '#53E0BC' }}
                                autocapitalize='none'
                                placeholder='Email'
                                placeholderTextColor="#3C4560"
                                opacity={0.5}
                                keyboardType='email-address'
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Platform.OS === 'ios' ? hp('5%') : hp('3%'), height: Platform.OS === 'ios' ? hp('6.5%') : hp('8%'), borderRadius: 30, borderWidth: 1, borderColor: '#53E0BC', alignSelf: 'center', width: Dimensions.get('window').width - 30 }}>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <Icon name='lock-closed' size={30} color='#53E0BC' />
                            </View>
                            <TextInput style={{ flex: 0.8, fontSize: 22, color: '#53E0BC' }}
                                autocapitalize='none'
                                placeholder='Password'
                                autoCompleteType="off"
                                placeholderTextColor="#3C4560"
                                opacity={0.5}
                                secureTextEntry
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Platform.OS === 'ios' ? hp('5%') : hp('3%'), height: Platform.OS === 'ios' ? hp('6.5%') : hp('8%'), borderRadius: 30, borderWidth: 1, borderColor: '#53E0BC', alignSelf: 'center', width: Dimensions.get('window').width - 30 }}>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <Icon name='lock-closed' size={30} color='#53E0BC' />
                            </View>
                            <TextInput style={{ flex: 0.8, fontSize: 22, color: '#53E0BC' }}
                                autocapitalize='none'
                                autoCompleteType="off"
                                placeholder='Conform password'
                                placeholderTextColor="#3C4560"
                                opacity={0.5}
                                secureTextEntry
                                onChangeText={conformPassword => this.setState({ conformPassword })}
                                value={this.state.conformPassword}
                            />
                        </View>
                        <View style={{ alignSelf: 'center', alignItems: 'center', justifycontent: 'center', marginTop: Platform.OS === 'ios' ? hp('5%') : hp('3%'), height: 50, width: Dimensions.get('window').width }}>
                            <TouchableOpacity onPress={() => this.onSignUp()}>
                                <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: '#53E0BC', height: 50, borderRadius: 25, borderWidth: 1, borderColor: '#53E0BC', width: Dimensions.get('window').width - 250, shadowColor: '#53E0BC', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 1 }}>
                                    <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>CREATE</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {Platform.OS === 'android' ?
                            <View style={{ flex: 1, alignItems: 'center', paddingLeft: 20, flexDirection: 'row', justifyContent: 'center', bottom: 2, marginTop: hp('1%') }}>
                                <Text style={{ color: '#121212', fontSize: 16 }}>Already have an account?</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                    <Text style={{ color: '#53E0BC', fontSize: 16, fontWeight: '700' }}>Log In</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            null
                        }
                    </SafeAreaView>
                </KeyboardAwareScrollView>
                {
                    Platform.OS === 'ios' ?
                        <View style={{ position: 'absolute', alignItems: 'center', paddingLeft: 20, bottom: Platform.OS === 'ios' ? hp('3%') : hp('1%'), right: 0, left: 0, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ color: '#121212', fontSize: 16 }}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Text style={{ color: '#53E0BC', fontSize: 16, fontWeight: '700' }}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }
            </View >
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
const styles = StyleSheet.create({})
