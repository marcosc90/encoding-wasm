import * as encoding from "./mod.ts";
import {
  encode as encodeStd,
  decode as decodeStd,
} from "https://deno.land/std/encoding/base64.ts";

import { runBenchmarks, bench } from "https://deno.land/std/testing/bench.ts";
import { assertEquals } from "https://deno.land/x/std@v0.57.0/testing/asserts.ts";

const sourceImg = new Uint8Array(
  // 8m image
  await fetch(
    "https://github.com/denoland/deno_website2/raw/master/public/v1.png",
  )
    .then((res) => res.arrayBuffer()) as ArrayBuffer,
);

const decoder = new TextDecoder();
const encoder = new TextEncoder();

const b64image = encoding.b64Encode(sourceImg); // Uint8Array
const b64imageStr = decoder.decode(b64image); // string

/**
* Base 64 encode from Uint8Array / ArrayBuffer
* Input: 'Hello World'
* Output: Uint8Array
*/
const input = encoder.encode("hello world");
assertEquals(
  encoding.b64Encode(input),
  encoder.encode(encodeStd(input.buffer)),
);
bench(function base64EncodeWasm(b) {
  b.start();
  for (let i = 0; i < 1e6; i++) {
    encoding.b64Encode(input);
  }
  b.stop();
});

bench(function base64EncodeSTD(b) {
  b.start();
  for (let i = 0; i < 1e6; i++) {
    encoder.encode(encodeStd(input.buffer));
  }
  b.stop();
});

/**
* Base 64 encode from Uint8Array / ArrayBuffer
* Input: 'Hello World'
* Output: string
*/

assertEquals(
  encoding.b64EncodeToStr(input),
  encodeStd(input.buffer),
);

bench(function base64EncodeToStrWasm(b) {
  b.start();
  for (let i = 0; i < 1e6; i++) {
    encoding.b64EncodeToStr(input);
  }
  b.stop();
});

bench(function base64EncodeToStrSTD(b) {
  b.start();
  for (let i = 0; i < 1; i++) {
    encodeStd(input.buffer);
  }
  b.stop();
});

/**
* Base 64 decode 8mb image from Base64 encoded string
* Input: 8mb image
*/

assertEquals(
  encoding.b64DecodeFromStr(b64imageStr),
  new Uint8Array(decodeStd(b64imageStr)),
);

bench(function base64DecodeWasmImageStr(b) {
  b.start();
  for (let i = 0; i < 100; i++) {
    encoding.b64DecodeFromStr(b64imageStr);
  }
  b.stop();
});

bench(function base64DecodeSTDImageStr(b) {
  b.start();
  for (let i = 0; i < 1; i++) {
    new Uint8Array(decodeStd(b64imageStr));
  }
  b.stop();
});

/**
* Base 64 decode 8mb image from Base64 encoded Uint8Array
* Input: 8mb image
*/

assertEquals(
  encoding.b64Decode(b64image),
  new Uint8Array(
    decodeStd(decoder.decode(b64image)),
  ),
);

bench(function base64DecodeWasmImage(b) {
  b.start();
  for (let i = 0; i < 100; i++) {
    encoding.b64Decode(b64image);
  }
  b.stop();
});

bench(function base64DecodeSTDImage(b) {
  b.start();
  for (let i = 0; i < 100; i++) {
    // std does not support decoding from Uint8Array
    new Uint8Array(
      decodeStd(decoder.decode(b64image)),
    );
  }
  b.stop();
});

/**
* Base64 decode from Base64 string
* Input: "hello world" base64 encoded
*/

const inputB64 = "aGVsbG8gd29ybGQ=";
assertEquals(
  encoding.b64DecodeFromStr(inputB64),
  new Uint8Array(decodeStd(inputB64)),
);

bench(function base64DecodeStrWasm(b) {
  b.start();
  for (let i = 0; i < 1e6; i++) {
    encoding.b64DecodeFromStr(inputB64);
  }
  b.stop();
});

bench(function base64DecodeStrSTD(b) {
  b.start();
  for (let i = 0; i < 1e6; i++) {
    new Uint8Array(decodeStd(inputB64));
  }
  b.stop();
});

runBenchmarks();
