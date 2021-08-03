/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, ScrollView,Image,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Card, Divider, Text} from 'react-native-paper';
import styles from './home-screen.css';
import MyButton from '../../components/MyButton/MyButton';
import {Getallfacture} from '../../services/ocr/ocr';
import {useIsFocused} from '@react-navigation/native';

import Toast from 'react-native-toast-message';

const HomeScreen = (props) => {
  const [state, setState] = useState([{}]);
  const isFocused = useIsFocused();
  
  const Getallfacturefromservice = () => {
    
      try {
        Getallfacture()
          .then((responseData) => {
            if (responseData.length > 0) {
          
           setState(responseData.reverse());
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

  }

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('authId');
      props.navigation.navigate('login');
    } catch (error) {
      // Error saving data
    }
  };
 useEffect(() => {
  Getallfacturefromservice()
 }, [isFocused])
const  renderSub = () => {
  return state.map((value, index) => {
      return ( 

        <View key={index} style={styles.flexmenu}>
          {/[^.]+$/.exec(value.image) == "pdf" ? <Image source={{uri: 'https://s3-eu-west-1.amazonaws.com/textract-console-eu-west-1-5349f000-c8fe-423f-a6fb-6ec3bb31f312/pdf.png'}} style={{width: 80, height: 80}}/> : <Image source={{ uri: `https://s3-eu-west-1.amazonaws.com/textract-console-eu-west-1-5349f000-c8fe-423f-a6fb-6ec3bb31f312/${value.image}`}}  style={{width: 100, height: 100}}/> }
         <View> 
          <Text style={{color : 'green'}} >{value.newfacture && "New Facture"}</Text>
         <Text style={{ textAlign: "left" }}> code facture :{value.code_facture }</Text>
          <Text style={{ textAlign: "left" }}>Montant TTC : {value.montant_ttc }</Text>
          </View>
          </View>
      )
  })
}
  return (
    <View style={styles.viewHomeScreen}>
         <TouchableOpacity
      onPress={() => props.navigation.navigate('ocr')} 
       style={styles.roundButton1}>
 <Icon
 name='camera'
 type='font-awesome'
 size={45}
 circleSize={50}
 color='#fff'
 backgroundColor='#105065'
 style={styles.cameraicon}
 onPress={() => props.navigation.navigate('ocr')} />
     </TouchableOpacity>
      <ScrollView>
        <Card>
      
          <Card.Title
            titleStyle={styles.cardTitleStyleHomeScreen}
            title="Facture Information"
            
          />
        
        
          <Divider />
          <Card.Content>
         { 
           renderSub()
  
         }
       
        

          </Card.Content>
        </Card>
        <MyButton
                    style={styles.buttonHomeScreen}
                    color="#00A7E1"
                    onPress={() =>logOut()}
                    buttonTitle="Log Out"
                  />
    
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
