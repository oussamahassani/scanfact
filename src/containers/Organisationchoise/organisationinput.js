import React, {useState, useCallback} from 'react';
import {View, Alert, ScrollView , Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Card} from 'react-native-paper';
import MyButton from '../../components/MyButton/MyButton';
import AppHeader from '../../components/AppHeader/AppHeader';
import MyTextInput from '../../components/MyTextInput/MyTextInput';
import {useFocusEffect} from '@react-navigation/native';


const Organisation = (props) => {
  const [state, setState] = useState({
    organisation: '',

  });

  useFocusEffect(
    useCallback(() => {
      setState({
        ...state,
        organisation: '',

      });
    }, []),
  );

  return (
    <View >
      <AppHeader
        headerTitle="Organisation"
        leftIconMenu={false}
        rightIconMenu={false}
      />
      <ScrollView>
        <Card>
          <Card.Title
            title="select organisation"
          />
          <Card.Content>
            <Formik
              enableReinitialize={true}
              initialValues={{
                organisation: '',
               
              }}
              onSubmit={async (values, {resetForm}) => {
                AsyncStorage.setItem('organisation',values.organisation );
                let userData = {
                    organisation: values.organisation,

                };
               props.navigation.navigate('login')
               console.log("values is" , values.organisation)
     
                
               
              }}
              validationSchema={yup.object().shape({
                organisation: yup.string().required(),
              
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
                      label={"organisation name"}
                      onChangeText={handleChange('organisation')}
                      onBlur={handleBlur('organisation')}
                      value={values.organisation}
                      mode="outlined"
                      error={touched.organisation && errors.organisation ? true : false}
                      errorName={errors.organisation}
                    />
                  </View>
                 
                  <MyButton
                    onPress={handleSubmit}
                    labelStyle={{color: 'white'}}
                    color="#202d59"
                    mode="contained"
                    buttonTitle="next"
                  />
                  <MyButton
                    style={{marginTop: 10}}
                    color="#00A7E1"
                    onPress={() => props.navigation.navigate('register')}
                    buttonTitle="Cree un compte"
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

export default Organisation;
