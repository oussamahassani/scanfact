import React, {useState} from 'react';
import MyButton from '../../components/MyButton/MyButton';
import ImagePicker from 'react-native-image-crop-picker';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TouchableHighlight,
    Platform,
    PermissionsAndroid,
    ScrollView
} from 'react-native';
import {Card} from 'react-native-paper';
import {postimagetoocr} from '../../services/ocr/ocr'
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
 
const Ocr = (props) => {
    const [filePath, setFilePath] = useState("");
    const [image , setimage] = useState("")
    const [reponseocr, setreponseocr] = useState('');
    const [clicedbutton, setclicedbutton] = useState('');
    const [sendtoocr, setsendtoocr] = useState(false);
    const [btndisabel, setbtndisabled] = useState(false);
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };

    const captureImage = async (type) => {

        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            ImagePicker.openCamera({
                width: 1200,
                height: 1500, 
                cropping: true,
                includeBase64: false,
                compressImageQuality: 1,
                quality: 1,
                includeExif: true,
                forceJpg: true,
                freeStyleCropEnabled:true,
              }).then(response => {
                if (response.didCancel) {
                            alert('User cancelled camera picker');
                            return;
                        } else if (response.errorCode == 'camera_unavailable') {
                            alert('Camera not available on device');
                            return;
                        } else if (response.errorCode == 'permission') {
                            alert('Permission not satisfied');
                            return;
                        } else if (response.errorCode == 'others') {
                            alert(response.errorMessage);
                            return;
                        }
                        setimage(response);
              });
            // launchCamera(options, (response) => {
            //     console.log('Response = ', response);

            //     if (response.didCancel) {
            //         alert('User cancelled camera picker');
            //         return;
            //     } else if (response.errorCode == 'camera_unavailable') {
            //         alert('Camera not available on device');
            //         return;
            //     } else if (response.errorCode == 'permission') {
            //         alert('Permission not satisfied');
            //         return;
            //     } else if (response.errorCode == 'others') {
            //         alert(response.errorMessage);
            //         return;
            //     }
            //     console.log('base64 -> ', response.base64);
            //     console.log('uri -> ', response.uri);
            //     console.log('width -> ', response.width);
            //     console.log('height -> ', response.height);
            //     console.log('fileSize -> ', response.fileSize);
            //     console.log('type -> ', response.type);
            //     console.log('fileName -> ', response.fileName);
            //     setFilePath(response);
              
            
            // });
        }
    };
   const SendtoOcr  = () => {
       if(clicedbutton != '') {
    const data = new FormData();
    data.append('name', 'avatar');
    let pathParts = image.path.split('/');
    const name = pathParts[pathParts.length - 1].substr(pathParts[pathParts.length - 1].length -10 ,pathParts[pathParts.length - 1].length )
data.append('file', {
 uri : image.path,
 type: image.mime,
 name: pathParts[pathParts.length - 1]
 });

data.append('facture', clicedbutton);
setbtndisabled(true)
    postimagetoocr(data)
     .then(resp =>{ console.log(resp) ; 
        setreponseocr(resp)
        setsendtoocr(true)})
     .catch(err => { console.log(err)}) ; 
    //   setreponseocr(err)})
  
   }
   else {
        
       alert('choise type facture');
   }
}
    const chooseFile = (type) => {
        let options = {
            width: 1200,
            height: 1500, 
            cropping: true,
            includeBase64: false,
            compressImageQuality: 1,
            freeStyleCropEnabled: true,
            mediaType: type,
            quality: 1,
        };
       
        launchImageLibrary(options , (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            console.log('base64 -> ', response.base64);
            console.log('uri -> ', response.uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response);
            console.log('fileSize -> ', response.fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.fileName);
            setFilePath(response);
           
          

        
       });
   
    };
const changeattributclient = () => {
    setclicedbutton('client')
  
}
const changeattributfournisseur = () => {
    setclicedbutton('fournisseur')
  
}
const umptystate = () => {
    setimage("")
    setsendtoocr(false)
    setbtndisabled(false)
  
}
const cleanupImages = () => {
    setimage("")
    setsendtoocr(false)
    setbtndisabled(false)
        props.navigation.navigate('welcome-home')

}

const pickMultiple = () => {
     ImagePicker.openPicker({
        width: 1200,
        height: 1500, 
        cropping: true,
        includeBase64: false,
        compressImageQuality: 1,
        quality: 1,
        includeExif: true,
        forceJpg: true,
        freeStyleCropEnabled:true,
     }).then(image => {
     setimage(image)
     })
    .catch(e => alert(e));
}


    return (
        <ScrollView style={{flex: 1}}>
          <Card>
      
      <Card.Title
        titleStyle={styles.cardTitleStyleHomeScreen}
        title=""
        
      />
            
            <View style={styles.container}>
      
                {image !=="" ? <View>
                {console.log(image)}
             
                   <Image
                  style={styles.imageStyle}
                  source={{uri :image.path}}
                   
                /> 
                         <View style={styles.flexstyles}>
                 <TouchableOpacity onPress={changeattributclient}>
             
                 <Image
                    source={require('../../assets/assets/client.png')}
                    style={clicedbutton=="client"? styles.imageocrselection :  styles.imageocr }
                   
               
                /> 
                </TouchableOpacity>
                <TouchableOpacity onPress={changeattributfournisseur}>
                     <Image
                    source={require('../../assets/assets/fournisseur.png')}
                    style={clicedbutton =="fournisseur" ?  styles.imageocrselection :styles.imageocr}
                
                /> 
                </TouchableOpacity>
                </View>
              
                {sendtoocr ?
                <View>
                  <Text>{reponseocr}</Text>
                  <TouchableHighlight
                  style={styles.buttonStyle}
                  onPress={umptystate }
                >
                      <Text style={{color:"white"}}>scan autre</Text>
                </TouchableHighlight>
                </View>
                  :
                  <View>
              
                <TouchableHighlight activeOpacity={0.5}  disabled ={btndisabel}
                style={styles.buttonSendStyle} onPress={SendtoOcr}>
                <Text style={{color:"white"}}>Send to Ocr</Text>
                </TouchableHighlight>
                </View>
                  }
               
                </View> : <View>
                
          
                <TouchableOpacity
                    activeOpacity={0.15}
                    style={styles.buttonStyle}
                    onPress={ captureImage}>
                    <Text style={styles.textStyle}>
                    Capture  Image
                    </Text>
                </TouchableOpacity>
            
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.buttonStyle}
                    onPress={pickMultiple}>
                    <Text style={styles.textStyle}>Choose Image</Text>
                </TouchableOpacity>
               
                </View>
                   }
            </View>
            <MyButton
                    style={styles.buttonHomeScreen}
                    color="#00A7E1"
                    onPress={cleanupImages}
                    buttonTitle="cancel"
                  />
            </Card>
        </ScrollView>
    );
};

export default Ocr;

const styles = StyleSheet.create({
    flexstyles : {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonHomeScreen:{
   marginTop: 20, marginHorizontal: 20
    }
    ,
    imageocr: {
       width : 100,
        height:100,
    },
    imageocrselection:  {
        width : 100,
        height:100,
        backgroundColor: "#1890ff",
      },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
        // fontFamily: 'Arial'
        backgroundColor: '#1890ff',
        color:'white'
    },
    textStyle: {
        padding: 10,
        color: 'white',
        textAlign: 'center',

        fontStyle:'italic',
        fontWeight: 'bold'
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#202d59',
        padding: 5,
        marginVertical: 10,
        width: 250,
        borderRadius: 10


    },
    buttonSendStyle:{
        alignItems: 'center',
        backgroundColor: '#202d59',
        padding: 10,
        color:"white",
        marginVertical: 10,
        width: 250,
        borderRadius: 10,
        marginTop:25,
        marginLeft:"auto",
        marginRight:"auto",

    },
    imageStyle: {
        width: 200,
        height: 200,
        margin: 5,
        borderRadius:50,

    },
});