import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {useInit} from './hooks/useInit';
import RootNavigator from './navigation/root-navigator';
import store from './redux/store';

const App = () => {
  useInit();

  return (
    <Provider store={store.instance}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default gestureHandlerRootHOC(App);
