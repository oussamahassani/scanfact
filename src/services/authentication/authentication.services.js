import {API_URL} from '../../config/config';
import AsyncStorage from '@react-native-community/async-storage'
export const loginUserService = async (userData) => {
  const  organisation =  await AsyncStorage.getItem('organisation');
  console.log(organisation,userData)
  try {
    const response = await fetch(`http://${organisation}.`+API_URL + '/api/user/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const responseJson = await response.json();
    console.log('response object:', responseJson);
    return responseJson;
  } catch (error) {
    console.log("error",error);
    console.log('Request failed, Please try again!');
    return {message: 'Request failed, Please try again!'};
    // return error;
  }
};
 export const AddUserService = async (user) => {
   try{
       const  organisation =  await AsyncStorage.getItem('organisation');
    const response = await fetch(`http://${organisation}.`+API_URL + '/api/user/registeruser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const responseJson = await response.json();
       return responseJson
   }
   catch ( err) {
     return {message : 'request filed , please try later'}
   }
 }
export const registerUserService = async (userData) => {
  try {
    const response = await fetch(`http://www.`+API_URL + '/api/myClient/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const responseJson = await response.json();
    console.log('response object:', responseJson);
    return responseJson;
  } catch (error) {
    console.log(error);
    console.log('Request failed, Please try again!');
    return {message: 'Request failed, Please try again!'};
  }
};
