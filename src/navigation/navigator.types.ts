import {StackNavigationProp} from '@react-navigation/stack';

export type StackParamList = {
  editor: undefined;
  configDrone: undefined;
};

export type NavigationProp<T extends keyof StackParamList> =
  StackNavigationProp<StackParamList, T>;

export interface NavigationMixin<T extends keyof StackParamList> {
  navigation: NavigationProp<T>;
}
