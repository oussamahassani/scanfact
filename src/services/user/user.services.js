import AsyncStorage from '@react-native-community/async-storage';
import {API_URL} from '../../config/config';

export const getUserProfileDataService = async () => {
  let token = await AsyncStorage.getItem('token');
  const  organisation =  await AsyncStorage.getItem('organisation');
  let authId = await AsyncStorage.getItem('authId');

  try {
    const response = await fetch(`http://${organisation}.` + API_URL + `/api/user/getone/${authId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.log("erre" , error);
    console.log('Request failed, Please try again!');
    return {message: 'Request failed, Please try again!'};
  }
};

export const updateUserProfileDataService = async (values) => {
  let token = await AsyncStorage.getItem('token');
  let authId = await AsyncStorage.getItem('authId');
  const  organisation =  await AsyncStorage.getItem('organisation');
  try {
    const response = await fetch(`http://${organisation}.` +API_URL + `/api/user/${authId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(values)
    });
    const responseJson = await response.text();
 
    return responseJson;
  } catch (error) {
    console.log(error);
    console.log('Request failed, Please try again!');
    return {message: 'Request failed, Please try again!'};
  }
};

export const updateUserPasswordDataService = async (values) => {
  let token = await AsyncStorage.getItem('token');
  let authId = await AsyncStorage.getItem('authId');

  try {
    const response = await fetch(API_URL + `/api/user/${authId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: {password: values.password}
    });
    const responseJson = await response.text();
  
    return responseJson;
  } catch (error) {
    console.log(error);
    console.log('Request failed, Please try again!');
    return {message: 'Request failed, Please try again!'};
  }
};
