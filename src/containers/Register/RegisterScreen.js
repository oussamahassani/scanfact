/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react';
import {View, Alert, ScrollView} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Card} from 'react-native-paper';
import styles from './register-screen.css';
import MyButton from '../../components/MyButton/MyButton';
import AppHeader from '../../components/AppHeader/AppHeader';
import MyTextInput from '../../components/MyTextInput/MyTextInput';
import {registerUserService} from '../../services/authentication/authentication.services';
import {useFocusEffect} from '@react-navigation/native';

import Toast from 'react-native-toast-message';

const RegisterScreen = (props) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    lname: '',
    fname: '',
    subdomaine: '',
  });
  useFocusEffect(
    useCallback(() => {
      setState({
        ...state,
        email: '',
        password: '',
        lname: '',
        fname: '',
        subdomaine: '',
      });
    }, []),
  );

  return (
    <View style={styles.viewRegisterScreen}>
      <AppHeader
        headerTitle="Register"
        leftIconMenu={false}
        rightIconMenu={false}
      />
      <ScrollView>
        <Card>
          <Card.Title
            titleStyle={styles.cardTitleStyleRegisterScreen}
            title="Sign Up"
          />
          <Card.Content>
            <Formik
              enableReinitialize={true}
              initialValues={{
                email: '',
                password: '',
                lname: '',
                fname: '',
                subdomaine: '',
              }}
              onSubmit={(values, {resetForm}) => {
                let userData = {
                  email: values.email,
                  password: values.password,
                  fname: values.fname,
                  lname: values.lname,
                  subdomaine: values.subdomaine,
                };
                console.log(userData)
                registerUserService(userData)
                  .then((responseData) => {
                    console.log(responseData)
                    if (responseData.success) {
                      Toast.show({
                        type: 'success',
                        position: 'bottom',
                        text1: responseData.msg,
                        visibilityTime: 3000,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 40,
                      });

                      resetForm({});
                      AsyncStorage.setItem('token', responseData.token);
                      AsyncStorage.setItem(
                        'authId',
                        responseData.authId.toString(),
                      );
                      props.navigation.navigate('welcome-home');
                   
                    } else {
                      Toast.show({
                        type: 'error',
                        position: 'bottom',
                        text1: responseData.msg,
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
                subdomaine: yup.string().required(),
                fname: yup.string().required(),
                lname: yup.string().required(),
              
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
                    <MyTextInput
                      label="Nom de l'organisation"
                      onChangeText={handleChange('subdomaine')}
                      onBlur={handleBlur('subdomaine')}
                      mode="outlined"
                      value={values.subdomaine}
                      error={
                        (touched.subdomaine && errors.subdomaine) 
                      }
                      errorName={ errors.subdomaine }
                    />
                  </View>
                  <View>
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

                  <View>
                    <MyTextInput
                      label="Name"
                      onChangeText={handleChange('lname')}
                      onBlur={handleBlur('lname')}
                      value={values.lname}
                      mode="outlined"
                      error={
                        touched.lname && errors.lname ? true : false
                      }
                      errorName={errors.displayName}
                    />
                  </View>

                  <View>
                    <MyTextInput
                      label="Nom"
                      onChangeText={handleChange('fname')}
                      onBlur={handleBlur('fname')}
                      mode="outlined"
                      value={values.fname}
                      error={
                        touched.fname && errors.fname ? true : false
                      }
                      errorName={errors.fname}
                    />
                  </View>

                  <View>
                    <MyTextInput
                      label="Password"
                      secureTextEntry={true}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      mode="outlined"
                      value={values.password}
                      error={touched.password && errors.password ? true : false}
                      errorName={errors.password}
                    />
                  </View>

                 

                  <MyButton
                    onPress={handleSubmit}
                    color="#0C090D"
                    buttonTitle="Sing Up"
                  />
                  <MyButton
                    style={{marginTop: 10}}
                    color="#00A7E1"
                    onPress={() => props.navigation.navigate('login')}
                    buttonTitle="Have an account? Log in"
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

export default RegisterScreen;
