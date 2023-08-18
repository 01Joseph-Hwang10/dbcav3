import {createStore} from 'redux';
import RootReducer from './root-reducer';

const StoreFactory = (initialState?: any) =>
  createStore(RootReducer, initialState ?? {});

export default StoreFactory;
