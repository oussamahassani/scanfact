import React ,{useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {getUserProfileDataService} from '../services/user/user.services';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import{ AuthContext } from '../components/context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export function DrawerCt(props) {
    const [state, setState] = useState({userData: ''});
    const paperTheme = useTheme();
    const { signOut, toggleTheme } = React.useContext(AuthContext);
const getUserProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const id  = await AsyncStorage.getItem('authId');
      getUserProfileDataService()
   
        .then((responseData) => {
          console.log("token",token , id )
          console.log('userDataprofil' + responseData);
          if (Object.keys(responseData).length > 0) {
            console.log(true)
            setState({...state, userData: responseData});
          }  else {
            console.log('off')
            Toast.show({
              type: 'error',
              position: 'bottom',
              text1: "no data find",
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



    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                        <Avatar.Text size={50} label={state.userData.email} />
                          
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{state.userData.fname}</Title>
                                <Caption style={styles.caption}>{state.userData.lname}</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                            
                                <Caption style={styles.caption}>{state.userData.email}</Caption>
                            </View>
                           
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('welcome-home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Scan"
                            onPress={() => {props.navigation.navigate('adduser')}}
                        />
                          <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-question" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="add user"
                            onPress={() => {props.navigation.navigate('adduser')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="change password"
                            onPress={() => {props.navigation.navigate('change-password')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-settings" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="edit-profile"
                            onPress={() => {props.navigation.navigate('edit-profile')}}
                        />
                    
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 12,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
