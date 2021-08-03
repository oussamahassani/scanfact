import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    Button,
    TouchableHighlight
} from 'react-native';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
         
        <View style={styles.header}>
            <Image 
               
            source={require('../../assets/assets/logo.png')}
            style={[styles.logo]}
            resizeMode="stretch"
            />
        </View>
        <View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
      
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Follow your accounts!</Text>
             <TouchableHighlight> 
             <View>
            <Text style={styles.text}>Set your account Name</Text>
                  
                    
                    <Button
                       icon={{ name: "arrow-right",
                        size: 15}}
                      title="Get Started"
                      color="#202d59"
                      accessibilityLabel="Learn more about this purple button" 
                       onPress={()=>navigation.navigate('organisation')}/>
                    </View>
                    
            </TouchableHighlight> 
            
           
            
         
        </View>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.20;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  flex :{
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'row'
  }
 

});

