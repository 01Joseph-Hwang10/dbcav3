import {
  ImageStyle,
  SectionListData,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface RectSpec {
  width: number;
  height: number;
}

export interface PosSpec {
  x: number;
  y: number;
}

export type Nullable<T = any> = T | null | undefined;

export type SectionData<T = any> = {
  title: string;
  data: T[];
};

export type ISectionEdge<T = any> = {
  section: SectionListData<T>;
};

export interface StyleMixin {
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  contentContainerStyle?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
}
