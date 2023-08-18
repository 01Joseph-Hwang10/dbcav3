/* eslint-disable */
import { DroneModule } from "@src/modules/block-definitions/helpers";
import React from "react";
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ColorPalette } from "@src/themes/colors";
import { Nullable } from "@src/utils/types";


interface ModuleIconProps {
  module: Nullable<DroneModule | string>;
  size: number;
  onHexagonModule?: boolean;
}

const onModule = (onHexagonModule?: boolean) => onHexagonModule ? ColorPalette.black : ColorPalette.dark;

const ModuleIcon: React.FC<ModuleIconProps> = ({
  module,
  size,
  onHexagonModule,
}) => {
  switch (module) {
    case "motor":
      return (
        <Fontisto
          name="propeller-3"
          size={size}
          color={onModule(onHexagonModule)}
        />
      );
    case "barometer":
      return <Ionicons name="speedometer" size={size} color={ColorPalette.skyblue} />;
    case "camera":
      return (
        <FontAwesome
          name="video-camera"
          size={size}
          color={onModule(onHexagonModule)}
        />
      );
    case "colorSensor":
      return <Ionicons name="color-filter-sharp" size={size} color={ColorPalette.skyblue} />;
    case "infraredSensor":
      return (
        <MaterialCommunityIcons
          name="motion-sensor"
          size={size}
          color="tomato"
        />
      );
    case "lightSensor":
      return <Entypo name="light-up" size={size} color={ColorPalette.gold} />;
    case "soundSensor":
      return (
        <Entypo
          name="sound"
          size={size}
          color={onModule(onHexagonModule)}
        />
      );
    case "speaker":
      return (
        <Feather
          name="speaker"
          size={size}
          color={onModule(onHexagonModule)}
        />
      );
    case "temperatureSensor":
      return (
        <FontAwesome5 name="thermometer-half" size={size} color={ColorPalette.tomato} />
      );
    case "touchSensor":
      return (
        <MaterialIcons
          name="touch-app"
          size={size}
          color={onModule(onHexagonModule)}
        />
      );
    case "ultrasonicSensor":
      return (
        <MaterialCommunityIcons
          name="motion-sensor"
          size={size}
          color={ColorPalette.teal}
        />
      );
    case "main":
      return (
        <AntDesign
          name="API"
          size={size}
          color={onModule(onHexagonModule)}
        />
      );
    case "new":
      return (
        <AntDesign
          name="addfile"
          size={size}
          color={onModule(onHexagonModule)}
        />
      );
    default:
      return (
        <MaterialCommunityIcons
          name="function-variant"
          size={size}
          color={onModule(onHexagonModule)}
        />
      );
  }
};

export default ModuleIcon;
