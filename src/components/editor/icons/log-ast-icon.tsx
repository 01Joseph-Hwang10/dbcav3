import Loader from '@src/components/common/utilities/loader';
import {Transpiler} from '@src/modules/transpiler/transpiler';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import MenuBarIcon from './menu-bar-icon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {iconSize} from './icons.utils';
import {ColorPalette} from '@src/themes/colors';

/**
 *
 * @returns {React.FC}
 * @description This component is temproal for logging AST. This functionality is built for junwha00.
 */
const LogASTIcon: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const execute = async () => {
    setLoading(true);
    await Transpiler.logAST();
    setLoading(false);
  };
  return (
    <TouchableOpacity onPress={execute}>
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

export default LogASTIcon;
