import {ColorPalette} from '@src/themes/colors';
import {StyleMixin} from '@src/utils/types';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {LeadingMixin, PressableMixin} from './button.utils';
import {st} from '@src/themes/styles';
import {renderLeading} from './leading';
import {smallIconSize} from '@src/components/editor/icons/icons.utils';
import {v1 as uuidv1} from 'uuid';
import {connect, ConnectedProps} from 'react-redux';
import {switchHandler} from '@src/tools/handlers';
import {EditorState, setFocusedButtonId} from '@src/redux/slices/editor';
import {Dispatch} from 'redux';

interface PRoundedButton
  extends StyleMixin,
    LeadingMixin,
    PressableMixin,
    ConnectedProps<typeof c> {
  text: string;
  focusable?: boolean;
  backgroundColor?: string;
}

interface SRoundedButton {
  borderColor: string;
}

/**
 * @description @prop {StyleProp<ViewStyle | TextStyle | ImageStyle>} contentContainerStyle is applied at Text component
 */
class RoundedButton extends React.Component<PRoundedButton, SRoundedButton> {
  buttonId: string;
  borderWidth: number;

  state: SRoundedButton = {
    borderColor: this.backgroundColor ?? ColorPalette.transparent,
  };

  constructor(props: PRoundedButton) {
    super(props);
    this.buttonId = uuidv1();
    this.borderWidth = switchHandler(props.focusable, 2, 0);
  }

  private setFocusedStyle = (focused: boolean) => {
    if (focused) {
      this.setState({
        borderColor: ColorPalette.gold,
      });
    } else {
      this.setState({
        borderColor: this.backgroundColor,
      });
    }
  };

  get backgroundColor(): string {
    return this.props.backgroundColor ?? ColorPalette.transparent;
  }

  get focused(): boolean {
    return this.buttonId === this.props.focusedButtonId;
  }

  private handleFocused = () => {
    const {focusable} = this.props;
    if (focusable) {
      this.setFocusedStyle(this.focused);
    }
  };

  private onPress = () => {
    this.props.setFocusedButtonId(this.buttonId);
    this.handleFocused();
    this.props.onPress && this.props.onPress();
  };

  componentDidUpdate(prevProps: PRoundedButton) {
    if (prevProps.focusedButtonId !== this.props.focusedButtonId) {
      this.handleFocused();
    }
  }

  get focusedStyle(): ViewStyle {
    return {
      borderColor: this.state.borderColor,
      borderWidth: this.borderWidth,
    };
  }

  private renderButtonWithLeading = (): React.ReactNode => {
    const {leading, lock, style, contentContainerStyle, text} = this.props;
    return (
      <TouchableOpacity disabled={lock} onPress={this.onPress}>
        <View style={[styles.root, style, this.focusedStyle]}>
          <View style={st.center}>
            {renderLeading({
              lock,
              leading,
            })}
          </View>
          <View style={[st.center, styles.inner]}>
            <Text style={[styles.text, contentContainerStyle]}>{text}</Text>
          </View>
          <View style={styles.placeholder} />
        </View>
      </TouchableOpacity>
    );
  };

  private renderPlainButton = (): React.ReactNode => {
    const {lock, style, contentContainerStyle, text} = this.props;
    return (
      <TouchableOpacity disabled={lock} onPress={this.onPress}>
        <View style={[styles.root, style, this.focusedStyle]}>
          <Text style={[styles.text, contentContainerStyle]}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render(): React.ReactNode {
    const {lock, leading} = this.props;
    if (lock || leading) {
      return this.renderButtonWithLeading();
    } else {
      return this.renderPlainButton();
    }
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

export default c(RoundedButton);

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    width: '100%',
    borderRadius: 5,
    paddingVertical: 2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 18,
    color: ColorPalette.white,
    textAlign: 'center',
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholder: {
    minWidth: smallIconSize,
    minHeight: smallIconSize,
  },
});
