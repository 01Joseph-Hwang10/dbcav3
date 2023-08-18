import {combineReducers} from 'redux';
import {editorReducer as editor} from './slices/editor';
import {workspaceReducer as workspace} from './slices/workspace';
import {configDroneReducer as configDrone} from './slices/config-drone';

const RootReducer = combineReducers({
  editor,
  workspace,
  configDrone,
});

export default RootReducer;

/**
 * @description This type implementation instead of directly exporting the type is
 *              to avoid the circular dependency issue;
 */
declare global {
  export type RootState = ReturnType<typeof RootReducer>;
}
