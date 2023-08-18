import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {FunctionBlock} from '@src/modules/block-definitions/functions/function';
import {VarBlock} from '@src/modules/block-definitions/variables/variable';
import {setModules} from '@src/redux/slices/config-drone';
import {setFunctions, setGlobalVars} from '@src/redux/slices/workspace';
import store from '@src/redux/store';
import {useEffect} from 'react';
import Orientation from 'react-native-orientation-locker';
import {batch} from 'react-redux';
import {WorkspaceImage, WORKSPACE_IMAGE} from './useAutoSave';

const useDataLoader = () => {
  const storage = useAsyncStorage(WORKSPACE_IMAGE);
  useEffect(() => {
    void (async function () {
      const rawImage = await storage.getItem();
      if (!rawImage) return;
      console.log(rawImage);
      const image: WorkspaceImage = JSON.parse(rawImage);
      batch(() => {
        if (image?.functions?.length >= 1) {
          const functions = image.functions.map(func =>
            FunctionBlock.fromJSON(func),
          );
          store.dispatch(setFunctions(functions));
        }
        const globalVars =
          image.globalVars?.map(globalVar => VarBlock.fromJSON(globalVar)) ??
          [];
        store.dispatch(setGlobalVars(globalVars));
        const drone = image?.drone ?? new Array(6).fill(null);
        store.dispatch(setModules(drone));
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useInit = () => {
  // useDataLoader();
  useEffect(() => {
    Orientation.lockToLandscapeLeft();
  }, []);
};
