/* eslint-disable */
import { Easing } from "react-native-reanimated";
import { EdgeInsets } from "react-native-safe-area-context";
import { textWrapperSize, triangleSideLength } from "../constants";
import { PosSpec } from "@src/utils/types";
import { linearEquation } from "../../common/helpers";

export namespace Rotate {
  export const cis = (portNumber: number) => portNumber % 2 === 0 ? '30deg' : '-30deg';
  export const trans = (portNumber: number) => portNumber % 2 === 1 ? '30deg' : '-30deg';
}

export const easeOutCubic = Easing.bezier(0.33, 1, 0.68, 1);

export const easeInCubic = Easing.bezier(0.32, 0, 0.67, 0);

export const textPosX = (portNumber: number): number => {
  switch (portNumber) {
    case 1:
      return textWrapperSize / 3;
    case 2:
      return (textWrapperSize / 3) * -1;
    case 3:
      return (textWrapperSize / 3) * -1;
    case 6:
      return textWrapperSize / 3;
    case 4:
      return 0;
    case 5:
      return 0;
    default:
      return 0;
  }
};

export const textPosY = (portNumber: number): number => {
  switch (portNumber) {
    case 1:
      return textWrapperSize / 3;
    case 2:
      return textWrapperSize / 3;
    case 3:
      return textWrapperSize / 3;
    case 6:
      return textWrapperSize / 3;
    case 4:
      return textWrapperSize;
    case 5:
      return textWrapperSize;
    default:
      return 0;
  }
};

export const modulePosX = (portNumber: number, inset: EdgeInsets): number => {
  switch (portNumber) {
    case 1:
      return (triangleSideLength * 2) / 3;
    case 2:
      return (-triangleSideLength * 2) / 3;
    case 3:
      return -triangleSideLength;
    case 6:
      return triangleSideLength;
    case 4:
      return (-triangleSideLength * 2) / 3;
    case 5:
      return (triangleSideLength * 2) / 3;
    default:
      return 0;
  }
};

export const modulePosY = (
  portNumber: number,
  inset: EdgeInsets
): number => {
  switch (portNumber) {
    case 1:
      return (-triangleSideLength * 3) / 4;
    case 2:
      return (-triangleSideLength * 3) / 4;
    case 3:
      return Math.abs(inset.top - inset.bottom) / 2;
    case 6:
      return Math.abs(inset.top - inset.bottom) / 2;
    case 4:
      return triangleSideLength;
    case 5:
      return triangleSideLength;
    default:
      return 0;
  }
};

export const popUpPosX = (portNumber: number): number => {
  switch (portNumber) {
    case 1:
      return triangleSideLength * 1.3;
    case 2:
      return -triangleSideLength;
    case 3:
      return -triangleSideLength;
    case 6:
      return triangleSideLength * 1.3;
    case 4:
      return -triangleSideLength;
    case 5:
      return triangleSideLength * 1.3;
    default:
      return 0;
  }
};

export const popUpPosY = (portNumber: number): number => {
  switch (portNumber) {
    case 1:
      return (-triangleSideLength * 2) / 3;
    case 2:
      return -triangleSideLength / 3;
    case 3:
      return 0;
    case 6:
      return 0;
    case 4:
      return triangleSideLength / 3;
    case 5:
      return triangleSideLength / 3;
    default:
      return 0;
  }
};

export const decidePortNumber = (
  tappedPortNumber: number,
  tappedPosition: PosSpec,
  origin: PosSpec
): number => {
  if (tappedPortNumber === 2) {
    if (tappedPosition.x > origin.x) return 1;
  }

  if (tappedPortNumber === 3) {
    if (
      tappedPosition.y <
      linearEquation(
        1 / Math.sqrt(3),
        origin.y - origin.x / Math.sqrt(3),
        tappedPosition.x
      )
    )
      return 2;
  }

  if (tappedPortNumber === 4) {
    if (
      tappedPosition.y <
      linearEquation(
        -1 / Math.sqrt(3),
        origin.y + origin.x / Math.sqrt(3),
        tappedPosition.x
      )
    )
      return 3;
  }

  if (tappedPortNumber === 5) {
    if (tappedPosition.x < origin.x) return 4;
  }

  if (tappedPortNumber === 6) {
    if (
      tappedPosition.y <
      linearEquation(
        -1 / Math.sqrt(3),
        origin.y + origin.x / Math.sqrt(3),
        tappedPosition.x
      )
    )
      return 1;
  }

  return tappedPortNumber;
};

const horizontalAdjustment = triangleSideLength * (Math.sqrt(3) / 6);
const verticalAdjustment = triangleSideLength * (2 / 3);

type ITrianglePos = Partial<{
  transform: (
    | {
        translateX: number;
        translateY?: undefined;
      }
    | {
        translateY: number;
        translateX?: undefined;
      }
  )[];
}>

export const trianglePos = (
  portNumber: number,
  inset: EdgeInsets,
  animatedValue: number
): ITrianglePos => {
  "worklet";
  const insetDiffX = Math.abs(inset.left - inset.right)
  const insetDiffY = Math.abs(inset.top - inset.bottom)
  const halfInsetDiffY = insetDiffY / 2
  switch (portNumber) {
    case 1:
      return {
        transform: [
          {
            translateX:
              horizontalAdjustment + insetDiffX + animatedValue,
          },
          {
            translateY:
              -verticalAdjustment -
              halfInsetDiffY -
              animatedValue,
          },
        ],
      };
    case 2:
      return {
        transform: [
          {
            translateX:
              -horizontalAdjustment +
              insetDiffX -
              animatedValue,
          },
          {
            translateY:
              -verticalAdjustment -
              halfInsetDiffY -
              animatedValue,
          },
        ],
      };
    case 3:
      return {
        transform: [
          {
            translateX:
              -horizontalAdjustment * 3 * 0.95 +
              insetDiffX -
              animatedValue,
          },
          { translateY: 0 - halfInsetDiffY },
        ],
      };
    case 4:
      return {
        transform: [
          {
            translateX:
              -horizontalAdjustment +
              insetDiffX -
              animatedValue,
          },
          {
            translateY:
              verticalAdjustment -
              halfInsetDiffY +
              animatedValue,
          },
        ],
      };
    case 5:
      return {
        transform: [
          {
            translateX:
              horizontalAdjustment + insetDiffX + animatedValue,
          },
          {
            translateY:
              verticalAdjustment -
              halfInsetDiffY +
              animatedValue,
          },
        ],
      };
    case 6:
      return {
        transform: [
          {
            translateX:
              horizontalAdjustment * 3 * 0.95 +
              insetDiffX +
              animatedValue,
          },
          { translateY: 0 - halfInsetDiffY },
        ],
      };
    default:
      return {};
  }
};
