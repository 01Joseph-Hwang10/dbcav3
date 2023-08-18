import {createReducer} from '@reduxjs/toolkit';
import {AnyAction, createStore, Store, Unsubscribe} from 'redux';

class _store {
  instance: Store<RootState>;

  constructor() {
    /**
     * @description Create a redux store which is not initialized yet.
     */
    this.instance = createStore(createReducer({}, () => {}));
  }

  get state() {
    return this.instance.getState();
  }

  initialize(store: Store) {
    this.instance = store;
  }

  dispatch(action: AnyAction): AnyAction {
    return this.instance.dispatch(action);
  }

  subscribe(
    listener: (
      state: RootState,
      dispatch: (action: AnyAction) => AnyAction,
    ) => void,
  ): Unsubscribe {
    const callback = () => {
      listener(this.state, this.dispatch);
    };
    return this.instance.subscribe(callback);
  }
}

const store = new _store();

export default store;
