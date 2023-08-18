import Aux from '@src/components/editor/aux';
import MenuBar from '@src/components/editor/menu-bar';
import Palette from '@src/components/editor/palette';
import Workspace from '@src/components/editor/workspace';
import {ColorPalette} from '@src/themes/colors';
import React from 'react';
import InputDialog from '@src/components/editor/dialog/input-dialog';
import {useEditorControl} from '@src/hooks/useEditorControl';
import styled from 'styled-components/native';
import {useAutoSave} from '@src/hooks/useAutoSave';

const RootView = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${ColorPalette.dark};
  flex-direction: row;
`;

const Editor: React.FC = () => {
  useAutoSave();
  useEditorControl();
  return (
    <RootView>
      <MenuBar />
      <Palette />
      <Workspace />
      <Aux />
      <InputDialog />
    </RootView>
  );
};

export default Editor;
