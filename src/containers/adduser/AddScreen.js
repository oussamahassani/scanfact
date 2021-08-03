/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react';
import {View, Alert, ScrollView} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Card} from 'react-native-paper';
import MyButton from '../../components/MyButton/MyButton';
import AppHeader from '../../components/AppHeader/AppHeader';
import MyTextInput from '../../components/MyTextInput/MyTextInput';
import {AddUserService} from '../../services/authentication/authentication.services';
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
    <View>
      <AppHeader
        headerTitle="Add new"
        leftIconMenu={false}
        rightIconMenu={false}
      />
      <ScrollView>
        <Card>
          <Card.Title
           
            title="send email to new user"
          />
          <Card.Content>
            <Formik
              enableReinitialize={true}
              initialValues={{
                email: '',
                lname: '',
                fname: '',
              }}
              onSubmit={(values, {resetForm}) => {
                let userData = {
                  email: values.email,
                  fname: values.fname,
                  lname: values.lname,
                };
                AddUserService(userData)
                  .then((responseData) => {
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
                      onChangeText={handleChange('displayName')}
                      onBlur={handleBlur('displayName')}
                      value={values.displayName}
                      mode="outlined"
                      error={
                        touched.displayName && errors.displayName ? true : false
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

                  {/* <View>
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
                  </View> */}

                 

                  <MyButton
                    onPress={handleSubmit}
                    color="#0C090D"
                    buttonTitle="add"
                  />
                  {<MyButton
                    style={{marginTop: 10}}
                    color="#00A7E1"
                    onPress={() => props.navigation.navigate('welcome-home')}
                    buttonTitle="cancel"
                  /> }
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
