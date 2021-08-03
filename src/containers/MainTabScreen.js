import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './Welcome-Home/HomeScreen';

import  OCRScreen from './ocr/ocr';

const HomeStack = createStackNavigator();
const OCRScreenStack  = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#201d40"
      barStyle={{ backgroundColor: '#009387' }}
    >
       <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
   

      {/* <Tab.Screen
        name="Scan"
        component={OcrStackScreen}
        options={{
          tabBarLabel: 'Scan',
         // tabBarColor: '#202d59',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />  */}
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#202d59',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        } ,
       
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Acceuil',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#202d59" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</HomeStack.Navigator>
);

const OcrStackScreen = ({navigation}) => (
<OCRScreenStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#202d59',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        },  

    }}>
        <OCRScreenStack.Screen name="Scan Facture" component={OCRScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#202d59" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</OCRScreenStack.Navigator>
);
  