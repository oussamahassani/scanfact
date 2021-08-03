import {API_URL} from '../../config/config';
import AsyncStorage from '@react-native-community/async-storage';
export const postimagetoocr = async (image) => {

  const  organisation =  await AsyncStorage.getItem('organisation');
    try {
      console.log("mon image est" ,image );
      const response = await fetch(`http://${organisation}.` + API_URL +`/api/scanfacture/upload`, {
        method: 'POST',
        body:image
      });
      const responseJson = await response.text();
     
      return responseJson;
    } catch (error) {
      console.log("postimage",error);
     
      return {message: 'Request post image, Please try again!'};
    }
  };
  export const Getallfacture = async () => {

    const  organisation =  await AsyncStorage.getItem('organisation');
      try {
        const response = await fetch(`http://${organisation}.` + API_URL +`/api/scanfacture`, {
          method: 'GET'
        });
        const responseJson = await response.json();
       
        return responseJson;
      } catch (error) {
        console.log("getallfact",error);
       
        return {message: 'Request get facture, Please try again!'};
      }
    };