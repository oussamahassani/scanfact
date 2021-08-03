import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  viewHomeScreen: {
    flex: 1,
    // alignItems: 'stretch',
    // padding: 20,
  },
  buttonHomeScreen: {marginTop: 20, marginHorizontal: 20},
  cardTitleStyleHomeScreen: {
    color: '#202d59',
  },
  textOne: {fontWeight: 'bold', fontSize: 16, marginVertical: 5},
  flexmenu: {justifyContent:"space-between" ,flexDirection: 'row' ,marginBottom: 30 },
  cameraicon : {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
},
  roundButton1: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    position:'absolute',
    bottom:15,
    right:15,
    zIndex:10,
    backgroundColor: '#202d59',
  },
});

