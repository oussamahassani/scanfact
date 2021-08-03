import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../containers/Login/LoginScreen';
import RegisterScreen from '../containers/Register/RegisterScreen';
import HomeScreen from '../containers/Welcome-Home/HomeScreen';
import ChangePasswordScreen from '../containers/Change-Password/ChangePasswordScreen';
import EditProfileScreen from '../containers/Edit-Profile/EditProfileScreen';
import Mesfacture from '../containers/Mesfacture/mesfacture'
import Ocr from '../containers/ocr/ocr'
import Organisation  from '../containers/Organisationchoise/organisationinput'
import SplashScreen  from '../containers/spalchsecreen/SplashScreen'
const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="organisation" component={Organisation}  options={{title: 'organisation', headerShown: false}}/>
        <RootStack.Screen name="login" component={LoginScreen}  options={{title: 'Login', headerShown: false}}/>
        <RootStack.Screen name="register" component={RegisterScreen}  options={{title: 'register', headerShown: false}}/>
       
        
    </RootStack.Navigator>
);

export default RootStackScreen;