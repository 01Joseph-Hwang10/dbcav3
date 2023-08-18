import {st} from '@src/themes/styles';
import {InsetsData} from '@src/themes/utils';
import {StyleMixin} from '@src/utils/types';
import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const InsetsView: React.FC<Omit<InsetsData, 'insets'> & StyleMixin> = ({
  children,
  style,
  ...rest
}) => {
  const insets = useSafeAreaInsets();
  return <View style={[st.insets({insets, ...rest}), style]}>{children}</View>;
};

export default InsetsView;
