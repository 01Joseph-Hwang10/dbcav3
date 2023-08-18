import hexToRgba from 'hex-to-rgba';

export const randomStringWithDate = () => Date.now().toString(36);

export const withOpacity = (hex: string, opacity: number): string =>
  hexToRgba(hex, opacity);
