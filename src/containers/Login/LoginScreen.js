/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import {View, Alert, ScrollView, Linking,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import * as yup from 'yup';
import {Formik} from 'formik';
import {Card} from 'react-native-paper';
import styles from './login-screen.css';
import {loginUserService} from '../../services/authentication/authentication.services';
import Feather from 'react-native-vector-icons/Feather';
import AppHeader from '../../components/AppHeader/AppHeader';
import MyTextInput from '../../components/MyTextInput/MyTextInput';
import MyButton from '../../components/MyButton/MyButton';
import {useIsFocused} from '@react-navigation/native';
import { AuthContext } from '../../components/context';
import Toast from 'react-native-toast-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const LoginScreen = (props) => {
  const isFocused = useIsFocused;
  const [state, setState] = useState({email: '', password: ''});
  const { signIn } = React.useContext(AuthContext);
  const [secureTextEntry , setsecureTextEntry ] = useState(true)
  // useEffect(() => {
  //   AsyncStorage.getItem('token').then((userToken) => {
  //     if (userToken) {
  //       props.navigation.navigate('welcome-home');
  //     }
  //   });
  // }, []);

  useEffect(() => {
    setState({...state, email: '', password: ''});
  }, [isFocused]);
  const updateSecureTextEntry = () => {
    setsecureTextEntry( !secureTextEntry)
    }

  return (
    <View style={styles.viewLoginScreen}>
      <AppHeader
        headerTitle="XPR login"
        leftIconMenu={false}
        rightIconMenu={true}
      />
      <ScrollView>
        <Card>
          <Card.Title
            titleStyle={styles.cardTitleStyleLoginScreen}
            title="Sign In"
          />

          <Card.Content>
            <Formik
              enableReinitialize={true}
              initialValues={state}
              onSubmit={(values, {resetForm}) => {
                let userData = {
                  email: values.email,
                  password: values.password,
                };
                console.log("login",userData)
                loginUserService(userData)
                  .then((responseData) => {
                    console.log(responseData)
                    if (responseData.token) {
                      Toast.show({
                        type: 'success',
                        position: 'bottom',
                        text1: 'login success',
                        visibilityTime: 3000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 40,
                      });
                      resetForm({});
                      AsyncStorage.setItem('token', responseData.token);
                      AsyncStorage.setItem(
                        'authId',
                        responseData.id.toString(),
                      );
                      signIn(responseData)
                     // props.navigation.navigate('welcome-home');
                    
                    } else {
                      Toast.show({
                        type: 'error',
                        position: 'bottom',
                        text1: "login file verifier tes info",
                        visibilityTime: 3000,
                        autoHide: true,
                      });
                      console.log('error');
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }}
              validationSchema={yup.object().shape({
                email: yup.string().required(),
                password: yup.string().required(),
              })}>
              {({
                handleChange,
                handleBlur,
                touched,
                errors,
                handleSubmit,
                values,
              }) => (
                <View>
                  <View>
                  <FontAwesome 
                    name="user-o"
                    color={"gray"}
                    size={20}
                />
                    <MyTextInput
                      label="Email"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                     mode="outlined"
                      error={touched.email && errors.email ? true : false}
                      errorName={errors.email}
                    />
                  </View>

                  <View >
              
                  <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
                    <MyTextInput
                      label="Password"
                      secureTextEntry={secureTextEntry ? true : false}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                     mode="outlined"
                      value={values.password}
                      error={touched.password && errors.password ? true : false}
                      errorName={errors.password}
                  
                    />
                 
                  </View>

                  <MyButton
                    labelStyle={{color: 'white'}}
                    color="#202d59"
                    onPress={handleSubmit}
                    mode="contained"
                    buttonTitle="Log In"
                  />

                
                </View>
              )}
            </Formik>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
