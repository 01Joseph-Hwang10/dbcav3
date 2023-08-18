import {AuxMode, setOptionMode} from '@src/redux/slices/editor';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useAuxMode} from './redux-queries';

export const useEditorControl = () => {
  const auxMode = useAuxMode();
  const [prevAuxMode, setPrevAuxMode] = useState<AuxMode>(auxMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (prevAuxMode !== auxMode) {
      setPrevAuxMode(auxMode);
      dispatch(setOptionMode([]));
    }
  }, [auxMode]); // eslint-disable-line react-hooks/exhaustive-deps
};
