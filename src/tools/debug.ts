import {resetConfigDrone} from '@src/redux/slices/config-drone';
import {resetEditor} from '@src/redux/slices/editor';
import {resetWorkspace} from '@src/redux/slices/workspace';
import store from '@src/redux/store';
import {batch} from 'react-redux';
// import axios from 'axios';
// import {Credentials} from '@src/utils/credentials';

const defaultCallback = () => {
  batch(() => {
    store.dispatch(resetConfigDrone());
    store.dispatch(resetWorkspace());
    store.dispatch(resetEditor());
  });
};

class _Logger {
  constructor() {}

  async info(log: any) {
    if (process.env.NODE_ENV === 'development') {
      console.info(log);
    } else {
      // await this.sendLog(log);
    }
  }

  async warn(log: any) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(log);
    } else {
      // await this.sendLog(log);
    }
  }

  async error(log: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error(log);
    } else {
      // await this.sendLog(log);
    }
  }
}

export const Logger = new _Logger();

export const handleError = (log: any, callback?: () => void) => {
  if (__DEV__ && log) {
    console.error(log?.toString ? log.toString() : log);
  }
  if (callback) {
    callback();
  } else {
    defaultCallback();
  }
};
