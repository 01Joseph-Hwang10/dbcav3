import {Base64} from '@src/tools/base64';

declare global {
  interface Array<T = any> {
    mapEach<U = any, V = any>(
      callbackfn: (
        value: U,
        [indexInner, indexOuter]: [number, number],
        [arrayInner, arrayOuter]: [U[], T[]],
      ) => V,
      thisArg?: any,
    ): T[];
    concatLeft(...args: T[]): T[];
    chain<U = any>(callbackfn: (value: T[]) => U[]): U[];
    toUint8Array(): Uint8Array;
    cast<U = any>(): U[];
  }

  interface Uint8Array {
    encodeFromUint8Array(): string;
    toUint32Array(): Uint32Array;
    untype(): number[];
  }

  interface Uint32Array {
    untype(): number[];
  }
}

Array.prototype.cast = function <U = any>() {
  return this.map(item => item as U);
};

Array.prototype.mapEach = function (callbackfn, thisArg) {
  return this.map(
    (item: any[], indexOuter: number, arrayOuter: any[]) =>
      item.map((value, indexInner: number, arrayInner: any[]) =>
        callbackfn(value, [indexInner, indexOuter], [arrayInner, arrayOuter]),
      ),
    thisArg,
  );
};

Array.prototype.concatLeft = function (...args) {
  return args.concat(this);
};

/**
 * @description This method assumes that the array consists with int32 values
 *
 *              Tip : 0xff = 255
 */
Array.prototype.toUint8Array = function () {
  return new Uint8Array(
    this.map(
      value =>
        new Array(4)
          .fill(null)
          .map((_, index) => index * 8)
          .reverse()
          .map(shift => (value >> shift) & 0xff), // eslint-disable-line no-bitwise
    ).flat(),
  );
};

Array.prototype.chain = function (callbackfn) {
  return callbackfn(this);
};

Uint8Array.prototype.encodeFromUint8Array = function () {
  return Base64.encodeFromUint8Array(this) ?? '';
};

Uint8Array.prototype.untype = function () {
  return Array.from(this);
};

Uint8Array.prototype.toUint32Array = function () {
  const uint32Array = [];
  let int32 = 0;
  const shift = new Array(4)
    .fill(null)
    .map((_, index) => index * 8)
    .reverse();
  this.untype().forEach((value, index) => {
    const currentIdx = index % 4;
    if (currentIdx === 0) {
      uint32Array.push(int32);
      int32 = 0;
    }
    int32 = int32 | (value << (shift[currentIdx] * 8)); // eslint-disable-line no-bitwise
  });
  if (int32 !== 0) uint32Array.push(int32);
  return new Uint32Array(uint32Array);
};

Uint32Array.prototype.untype = function () {
  return Array.from(this);
};

export {};
