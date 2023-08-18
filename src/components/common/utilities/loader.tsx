import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';

interface PLoader extends ActivityIndicatorProps {
  loading: boolean;
}

const Loader: React.FC<PLoader> = ({loading, children, size, ...rest}) => {
  return (
    <>
      {loading ? (
        <ActivityIndicator size={size ?? 'large'} {...rest} />
      ) : (
        children
      )}
    </>
  );
};

export default Loader;
