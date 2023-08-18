import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import ConfigDrone from '@src/views/config-drone';
import Editor from '@src/views/editor';
import React from 'react';
import {StackParamList} from './navigator.types';

const options: StackNavigationOptions = {
  headerShown: false,
};

const Stack = createStackNavigator<StackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="configDrone" screenOptions={options}>
      <Stack.Screen name="editor" component={Editor} />
      <Stack.Screen name="configDrone" component={ConfigDrone} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
