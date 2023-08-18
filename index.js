import '@src/utils/string';
import '@src/utils/array';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {AppRegistry, LogBox} from 'react-native';
import App from '@src/App';
import {name as appName} from './app.json';
import store from '@src/redux/store';
import StoreFactory from '@src/redux/store-factory';

LogBox.ignoreAllLogs(true);

store.initialize(StoreFactory());

AppRegistry.registerComponent(appName, () => App);
