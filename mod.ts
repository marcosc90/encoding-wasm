import * as encoding from "./dist/encoding_wasm.js";
import wasm from './dist/encoding_wasm_bytes.js';

// Load WASM
await encoding.default(wasm);

type IOUint8Array = (name: Uint8Array) => Uint8Array;
type inputString = (name: string) => Uint8Array;
type outputString = (name: Uint8Array) => Uint8Array;

export const b64Encode: IOUint8Array = encoding.base64_encode;
export const b64Decode: IOUint8Array = encoding.base64_decode;
export const b64DecodeFromStr: inputString = encoding.base64_decode_from_str;
export const b64EncodeToStr: outputString = encoding.base64_encode_to_str;
export const b64EncodeFromStr: inputString = encoding.base64_encode_from_str;
