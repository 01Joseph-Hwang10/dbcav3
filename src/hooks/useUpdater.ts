import {useSelector} from 'react-redux';

export const useUpdater = () => {
  useSelector((state: RootState) => state.workspace.updater);
};
