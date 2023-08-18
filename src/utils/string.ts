import {Base64} from '@src/tools/base64';
import {btoa, atob} from 'abab';

declare global {
  interface String {
    truncate: (max: number) => string;
    capitalize: () => string;
    concatLeft: (str: string) => string;
    toBase64: () => string;
    fromBase64: () => string;
    decodeToUint8Array: () => Uint8Array;
  }
}

String.prototype.truncate = function (max: number): string {
  if (this.length < max) {
    return this.toString();
  }
  return this.substring(0, max) + '...';
};

String.prototype.capitalize = function (): string {
  if (this.length === 0) {
    return '';
  }
  if (this.length === 1) {
    return this.toUpperCase();
  }
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.concatLeft = function (str: string): string {
  return str + this.toString();
};

String.prototype.toBase64 = function (): string {
  return btoa(this.toString()) ?? '';
};

String.prototype.fromBase64 = function (): string {
  return atob(this.toString()) ?? '';
};

String.prototype.decodeToUint8Array = function (): Uint8Array {
  return Base64.decodeToUint8Array(this.toString());
};

export {};
