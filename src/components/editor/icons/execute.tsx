import {ColorPalette} from '@src/themes/colors';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Snackbar from 'react-native-snackbar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {iconSize} from './icons.utils';
import MenuBarIcon from './menu-bar-icon';
import {Transpiler} from '@src/modules/transpiler/transpiler';
import Loader from '@src/components/common/utilities/loader';
import {useCharacteristic} from '@src/hooks/bluetooth/useCharacteristic';
import {CHARACTERISTIC_UUID} from '@src/modules/arduino/values';
import {Logger} from '@src/tools/debug';

const ExecuteIcon: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const send = useCharacteristic(CHARACTERISTIC_UUID);
  const execute = async () => {
    if (send) {
      setLoading(true);
      Snackbar.show({
        text: 'Compiling & Sending...',
        duration: Snackbar.LENGTH_SHORT,
      });
      const compiled = await Transpiler.compile();
      await send
        .writeWithResponse(compiled)
        .catch((err: any) => Logger.error(err?.message));
      Snackbar.show({
        text: 'Program now executing :)',
        duration: Snackbar.LENGTH_LONG,
      });
      setLoading(false);
      Transpiler.cleanUp();
    } else {
      Snackbar.show({
        text: 'No device connected',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };
  const logAST = async () => {
    setLoading(true);
    await Transpiler.logAST();
    setLoading(false);
  };
  return (
    <TouchableOpacity onLongPress={logAST} onPress={execute}>
      <MenuBarIcon>
        <Loader loading={loading}>
          <FontAwesome
            name="caret-right"
            size={iconSize * 1.5}
            color={ColorPalette.lime}
          />
        </Loader>
      </MenuBarIcon>
    </TouchableOpacity>
  );
};

export default ExecuteIcon;
