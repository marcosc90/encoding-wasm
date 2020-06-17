extern crate wasm_bindgen;

use std::str;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn base64_decode_from_str(input: &str) -> Vec<u8> {
    return base64::decode(&input).unwrap();
}

#[wasm_bindgen]
pub fn base64_decode(input: &[u8]) -> Vec<u8> {
    return base64::decode(str::from_utf8(&input).unwrap()).unwrap();
}

#[wasm_bindgen]
pub fn base64_encode_to_str(input: &[u8]) -> String {
    return base64::encode(&input);
}

#[wasm_bindgen]
pub fn base64_encode(input: &[u8]) -> Vec<u8> {
    return base64::encode(&input).into_bytes();
}

#[wasm_bindgen]
pub fn base64_encode_from_str(input: &str) -> Vec<u8> {
    return base64::encode(input.as_bytes()).into_bytes();
}