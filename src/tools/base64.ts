import {Nullable} from '@src/utils/types';
import {btoa, atob} from 'abab';

export namespace Base64 {
  export function encodeFromUint8Array(arr: Uint8Array): Nullable<string> {
    return btoa(String.fromCharCode(...Array.from(arr)));
  }
  export function decodeToUint8Array(str: string): Uint8Array {
    const decoded = atob(str);
    if (!decoded) return new Uint8Array();
    return Uint8Array.from(decoded.split('').map(s => s.charCodeAt(0)));
  }
}
