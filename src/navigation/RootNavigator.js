
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import { DrawerCt } from '../containers/DrawerContent';

import ChangePasswordScreen from '../containers/Change-Password/ChangePasswordScreen';
import EditProfileScreen from '../containers/Edit-Profile/EditProfileScreen';
import Mesfacture from '../containers/Mesfacture/mesfacture'
import Ocr from '../containers/ocr/ocr'
import HomeScreen from '../containers/MainTabScreen';
//import HomeScreen from '../containers/Welcome-Home/HomeScreen'
import Login from '../containers/Login/LoginScreen';
import Adduser from '../containers/adduser/AddScreen';
import { AuthContext } from '../components/context';

import RootStackScreen from '../navigation/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();

 export  const  RootNavigator = () => {

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const  loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      console.log("user",foundUser)
      const userToken = foundUser.token;
      
      const userName =" foundUser[0].username";
      
      try {
            
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
      console.log("state",loginState)

      } catch(e) {
        console.log(e);
      }
 
    },
    signOut: async() => {

      try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('authId');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
     
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('token');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme}>
    { loginState.userToken !== null ? (
        <Drawer.Navigator drawerContent={props => <DrawerCt {...props} />}>
           <Drawer.Screen name="welcome-home" component={HomeScreen} />
           <Drawer.Screen name="adduser" component={Adduser} />
          <Drawer.Screen name="change-password" component={ChangePasswordScreen} />
          <Drawer.Screen name="edit-profile" component={EditProfileScreen} />
          <Drawer.Screen name="mes-facture" component={Mesfacture} />
          <Drawer.Screen name="ocr" component={Ocr} />
          <Drawer.Screen name="login" component={Login} />
         
        </Drawer.Navigator>
      
    ):
    
   <RootStackScreen/>
    }
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
}


