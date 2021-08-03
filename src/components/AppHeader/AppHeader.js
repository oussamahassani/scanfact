import React from 'react';
import {Linking ,TouchableHighlight} from 'react-native';
import {Appbar} from 'react-native-paper';
import styles from './app-header.css';

const AppHeader = (props) => {
 
  return (
    <>
      <Appbar.Header style={styles.appHeader}>
        {props.leftIconMenu ? <Appbar.BackAction /> : null}
        <Appbar.Content
          titleStyle={styles.appHeaderContent}
          title={props.headerTitle}
          subtitle={props.headerSubTitle}
        />
        {props.searchHeaderMenu ? <Appbar.Action icon="magnify" /> : null}
        {props.rightIconMenu ? (
          <Appbar.Action
            icon={require('../../assets/assets/icon.png')}
            size={30}
            onPress={() => {
              Linking.openURL('https://www.xpr.com.tn');
            }}
          />
        ) : null}
      </Appbar.Header>
    </>
  );
};

export default AppHeader;
