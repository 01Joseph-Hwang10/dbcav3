import {setOrigin} from '@src/redux/slices/config-drone';
import React, {useState} from 'react';
import {useRef} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import Center from '../../common/styled/center';
import Loader from '../../common/utilities/loader';
import {triangleSideLength} from '../constants';
import HexagonPart from './hexagon-part';

const Frame = styled(Center)`
  width: ${triangleSideLength * 2.5}px;
  height: ${triangleSideLength * 2.5}px;
`;

const HexagonPanel: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const originRef = useRef<View>(null);
  const originOnLayout = () => {
    originRef?.current?.measure((_, __, ___, ____, pageX, pageY) => {
      dispatch(setOrigin({x: pageX, y: pageY}));
      setLoading(false);
    });
  };

  return (
    <Frame>
      <Loader loading={loading}>
        <HexagonPart portNumber={1} />
        <HexagonPart portNumber={2} />
        <HexagonPart portNumber={3} />
        <HexagonPart portNumber={4} />
        <HexagonPart portNumber={5} />
        <HexagonPart portNumber={6} />
      </Loader>
      <View ref={originRef} onLayout={originOnLayout} />
    </Frame>
  );
};

export default HexagonPanel;
