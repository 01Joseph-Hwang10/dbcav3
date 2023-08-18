import React from 'react';

/**
 * @description Mixin that includes custom & preset icons
 *              Preset includes:
 *                - lock: preset as lock icon, button won't be touchable.
 *                - deletable: preset as x icon.
 */
export interface LeadingMixin {
  lock?: boolean;
  deletable?: boolean;
  leading?: React.ReactElement;
  onLeadingPress?: () => void;
}

export interface ActionsMixin {
  actions?: React.ReactElement;
  onActionsPress?: (text?: string) => void;
  submit?: boolean;
}

export interface PressableMixin {
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  onLongPress?: () => void;
}
