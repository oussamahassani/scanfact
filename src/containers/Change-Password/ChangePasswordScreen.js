/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, ScrollView, LogBox, Alert} from 'react-native';
import {
  Button,
  Card,
  Title,
  Divider,
  TextInput,
  HelperText,
} from 'react-native-paper';

import * as yup from 'yup';
import {Formik} from 'formik';
import styles from './change-password-screen.css';
import {
  getUserProfileDataService,
  updateUserPasswordDataService,
} from '../../services/user/user.services';
import MyButton from '../../components/MyButton/MyButton';
import MyTextInput from '../../components/MyTextInput/MyTextInput';
import AppHeader from '../../components/AppHeader/AppHeader';
import Toast from 'react-native-toast-message';

const ChangePasswordScreen = (props) => {
  const [state, setState] = useState({
    userData: '',
    password: '',
    confirmPassword: '',
  });

  const getUserProfileData = async () => {
    try {
      getUserProfileDataService()
        .then((responseData) => {
          if (responseData!= undefined) {
            setState({
              ...state,
              email: responseData.email,
              phoneNumber: responseData.lname,
              displayName: responseData.fname,
            });
            console.log(responseData.lname);
          } else {
            Toast.show({
              type: 'error',
              position: 'bottom',
              text1: responseData.message,
              visibilityTime: 3000,
              autoHide: true,
            });
            console.log('error');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfileData();
  }, []);



  return (
    <View style={styles.viewChangePasswordScreen}>
      <AppHeader
        headerTitle="Change password"
        leftIconMenu={false}
        rightIconMenu={false}
      />
      <ScrollView>
        <Card>
          <Card.Title
        
            title="Set New Password"
          />
          <Divider />
          <Card.Content>
            <Formik
              enableReinitialize={true}
              initialValues={state}
              onSubmit={async (values, {resetForm}) => {
                console.log(values)
                updateUserPasswordDataService(values)
                  .then((responseData) => {
                    console.log("dateresponsepassword",responseData)
                    if (responseData) {
                      Toast.show({
                        type: 'success',
                        position: 'bottom',
                        text1: "profil updated",
                        visibilityTime: 3000,
                        autoHide: true,
                      });
                      resetForm({});
                      props.navigation.navigate('welcome-home');
                    
                    } else {
                      Toast.show({
                        type: 'error',
                        position: 'bottom',
                        text1: "server is too busy",
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
                password: yup.string().required(),
                confirmPassword: yup.string().required(),
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

                  <View>
                    <MyTextInput
                      label="Confirm Password"
                      secureTextEntry={true}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      mode="outlined"
                      value={values.confirmPassword}
                      error={
                        (touched.confirmPassword && errors.confirmPassword) ||
                        values.confirmPassword !== values.password
                          ? true
                          : false
                      }
                      errorName={
                        values.confirmPassword !== values.password
                          ? 'Password not matched'
                          : errors.confirmPassword
                      }
                    />
                  </View>

                  <MyButton
                    onPress={handleSubmit}
                    // labelStyle={{color: '#E01A4F'}}
                    color="#0C090D"
                    // mode="contained"
                    buttonTitle="Save Password"
                  />
                  <MyButton
                    style={{marginTop: 10}}
                    color="#E01A4F"
                    onPress={() => props.navigation.navigate('welcome-home')}
                    buttonTitle="Cancel"
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

export default ChangePasswordScreen;
