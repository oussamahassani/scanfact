/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, ScrollView , Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Card, Title, Divider} from 'react-native-paper';

import * as yup from 'yup';
import {Formik} from 'formik';
import styles from './edit-profile-screen.css';
import {getUserProfileDataService} from '../../services/user/user.services';
import {updateUserProfileDataService} from '../../services/user/user.services';
import MyButton from '../../components/MyButton/MyButton';
import AppHeader from '../../components/AppHeader/AppHeader';
import MyTextInput from '../../components/MyTextInput/MyTextInput';
import Toast from 'react-native-toast-message';

const EditProfileScreen = (props) => {
  const [state, setState] = useState({
    email: '',
    lname: '',
    fname: '',
  });
  const isFocused = useIsFocused();
  const getUserProfileData = async () => {
    try {
      getUserProfileDataService()
        .then((responseData) => {
          if (responseData!= undefined) {
            setState({
              ...state,
              email: responseData.email,
              lname: responseData.lname,
              fname: responseData.fname,
            });
          }
           else {
            Toast.show({
              type: 'error',
              position: 'bottom',
              text1: 'error data',
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
  }, [isFocused]);

 

  return (
    <View style={styles.viewEditProfileScreen}>
          <AppHeader
        headerTitle="Edit Profile"
        leftIconMenu={false}
        rightIconMenu={false}
      />
      <ScrollView>
        <Card>
          <Card.Title
            titleStyle={styles.cardTitleStyleEditScreen}
            title="User Profile"
          />
          <Divider />
          <Card.Content>
            <Title style={styles.emailstyle}>Email: {state.email}</Title>
            <Formik
              enableReinitialize={true}
              initialValues={state}
              onSubmit={async (values, {resetForm}) => {
                console.log("valeur",values)
                let userprofil = {
                  lname: values.lname,
                  fname: values.fname,
                };
                updateUserProfileDataService(userprofil)
                  .then((responseData) => {
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
                        text1: "server is to bussy",
                        visibilityTime: 3000,
                        autoHide: true,
                      });
                         console.log(responseData)
                     
                    }
                  })
                 
              }}
            >
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
                      label="Name"
                      onChangeText={handleChange('fname')}
                      onBlur={handleBlur('fname')}
                      value={values.fname}
                      mode="outlined"
                      error={
                        touched.fname && errors.fname ? true : false
                      }
                      errorName={errors.fname}
                    />
                  </View>
                  <View>
                    <MyTextInput
                      label="Prenom"
                      onChangeText={handleChange('lname')}
                      onBlur={handleBlur('lname')}
                      mode="outlined"
                      value={values.lname}
                      error={
                        touched.lname && errors.lname ? true : false
                      }
                    //  keyboardType="numeric"
                      errorName={errors.lname}
                    />
                  </View>

                  <MyButton
                    onPress={handleSubmit}
                    // labelStyle={{color: '#E01A4F'}}
                    color="#0C090D"
                    // mode="contained"
                    buttonTitle="Save Profile"
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

export default EditProfileScreen;
