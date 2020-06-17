// Adapted from https://deno.land/std/encoding/base64_test.ts
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import { assertEquals } from "https://deno.land/x/std@v0.57.0/testing/asserts.ts";
import {
  b64Encode,
  b64Decode,
  b64DecodeFromStr,
  b64EncodeToStr,
  b64EncodeFromStr,
} from "../mod.ts";

const testsetString = [
  ["", ""],
  ["f", "Zg=="],
  ["fo", "Zm8="],
  ["foo", "Zm9v"],
  ["foob", "Zm9vYg=="],
  ["fooba", "Zm9vYmE="],
  ["foobar", "Zm9vYmFy"],
];

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const testsetBinary = [
  [encoder.encode("\x00"), "AA=="],
  [encoder.encode("\x00\x00"), "AAA="],
  [encoder.encode("\x00\x00\x00"), "AAAA"],
  [encoder.encode("\x00\x00\x00\x00"), "AAAAAA=="],
];

Deno.test("[encoding/base64] testBase64EncodeString", () => {
  for (const [input, output] of testsetString) {
    assertEquals(b64EncodeFromStr(input), encoder.encode(output));
  }
});

Deno.test("[encoding/base64] testBase64EncodeUint8Array", () => {
  for (const [input, output] of testsetString) {
    assertEquals(
      b64Encode(encoder.encode(input)),
      encoder.encode(output as string),
    );
  }
});

Deno.test("[encoding/base64] testBase64DecodeString", () => {
  for (const [input, output] of testsetString) {
    assertEquals(b64DecodeFromStr(output), encoder.encode(input as string));
  }
});

Deno.test("[encoding/base64] testBase64DecodeUint8Array", () => {
  for (const [input, output] of testsetString) {
    assertEquals(
      b64Decode(encoder.encode(output as string)),
      encoder.encode(input as string),
    );
  }
});

Deno.test("[encoding/base64] testBase64EncodeBinary", () => {
  for (const [input, output] of testsetBinary) {
    assertEquals(b64EncodeToStr(input as Uint8Array), output);
    assertEquals(
      b64Encode(input as Uint8Array),
      new TextEncoder().encode(output as string),
    );
  }
});
