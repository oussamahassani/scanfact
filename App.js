

import React from 'react';
import {RootNavigator} from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
   <RootNavigator />

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;
