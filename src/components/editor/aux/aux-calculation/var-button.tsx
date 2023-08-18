import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {v1 as uuidv1} from 'uuid';
import Feather from 'react-native-vector-icons/Feather';
import {Dispatch} from 'redux';
import {EditorState, setFocusedButtonId} from '@src/redux/slices/editor';
import {connect, ConnectedProps} from 'react-redux';
import {ColorPalette} from '@src/themes/colors';
import styled from 'styled-components/native';
import Center from '@src/components/common/styled/center';
import {Bold} from '@src/components/common/styled/text';

const Container = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 5px 0px;
`;

interface PVarButton extends ConnectedProps<typeof c> {
  onPress: () => void;
  text: string;
}

interface SVarButton {
  borderColor: string;
}

class VarButton extends React.Component<PVarButton, SVarButton> {
  private buttonId: string;

  constructor(props: PVarButton) {
    super(props);
    this.buttonId = uuidv1();
  }

  get focused(): boolean {
    return this.buttonId === this.props.focusedButtonId;
  }

  private onPress = () => {
    this.props.setFocusedButtonId(this.buttonId);
    this.props.onPress && this.props.onPress();
  };

  get iconColor(): string {
    return this.focused ? ColorPalette.gold : ColorPalette.black;
  }

  render() {
    const {text} = this.props;
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Container>
          <Feather name="edit" size={24} color={this.iconColor} />
          <Center>
            <Bold>{text}</Bold>
          </Center>
          <View />
        </Container>
      </TouchableOpacity>
    );
  }
}

const sp = (state: RootState) => ({
  focusedButtonId: state.editor.focusedButtonId,
});

const dp = (dispatch: Dispatch) => ({
  setFocusedButtonId: (payload: EditorState['focusedButtonId']) =>
    dispatch(setFocusedButtonId(payload)),
});

const c = connect(sp, dp);

export default c(VarButton);
