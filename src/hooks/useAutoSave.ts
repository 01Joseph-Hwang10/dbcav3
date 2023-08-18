import AsyncStorage from '@react-native-async-storage/async-storage';
import {ConfigDroneState} from '@src/redux/slices/config-drone';
import {WorkspaceState} from '@src/redux/slices/workspace';
import store from '@src/redux/store';
import {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';

export const WORKSPACE_IMAGE = 'workspace_image';

export interface WorkspaceImage {
  functions: WorkspaceState['functions'];
  globalVars: WorkspaceState['globalVars'];
  drone: ConfigDroneState['modules'];
}

export const saveCurrentImage = async () => {
  const {functions, globalVars} = store.state.workspace;
  const {modules: drone} = store.state.configDrone;
  const image: WorkspaceImage = {
    functions,
    globalVars,
    drone,
  };
  await AsyncStorage.setItem(
    WORKSPACE_IMAGE,
    JSON.stringify(image),
    err => !!err && console.error(err),
  );
};

export const useAutoSave = () => {
  const firstCallRef = useRef<boolean>(true);
  const updater = useSelector((state: RootState) => state.workspace.updater);
  const modules = useSelector((state: RootState) => state.configDrone.modules);
  const globalVarsCount = useSelector(
    (state: RootState) => state.workspace.globalVars.length,
  );

  useEffect(() => {
    if (firstCallRef.current) {
      firstCallRef.current = false;
    } else {
      saveCurrentImage();
    }
  }, [updater, globalVarsCount, modules]);
};
