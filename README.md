
# WASM Encoding

Very fast encoding/decoding for Deno using WASM.

Compare the speed against Deno `std/encoding` by running:

```ts
deno run -A bench.ts
```

Currently supported:
- [x] Base64
- [ ] HEX 

## Base64


```ts
import {
  b64Encode,
  b64EncodeToStr,
  b64EncodeFromStr,
  b64Decode,
  b64DecodeFromStr
} from "https://deno.land/x/encoding_wasm/mod.ts";

const input = new TextEncoder().encode('hello world');
b64EncodeToStr(input); // aGVsbG8gd29ybGQ=


b64Encode(input);
b64EncodeFromStr('hello world');
/*
Uint8Array(16) [
  97, 71, 86, 115, 98,  71,
  56, 103, 100, 50, 57, 121,
  98, 71, 81,  61
] 
*/
```

JavaScript users, there's **no validation of the input**, make sure you pass the correct type, otherwise you'll get unexpected outputs.

- `b64Encode(input: Uint8Array): Uint8Array`
- `b64EncodeToStr(input: Uint8Array): string`
- `b64EncodeFromStr(input: string): Uint8Array`
- `b64DecodeFromStr(input: string): Uint8Array`
- `b64Decode(input: Uint8Array): Uint8Array`


# Building

Package it's already built for Deno, but you can build it yourself using:

```
wasm-pack build --target web 
```
