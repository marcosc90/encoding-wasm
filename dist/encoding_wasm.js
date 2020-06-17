let wasm;

let WASM_VECTOR_LEN = 0;

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
  if (
    cachegetUint8Memory0 === null ||
    cachegetUint8Memory0.buffer !== wasm.memory.buffer
  ) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory0;
}

let cachedTextEncoder = new TextEncoder("utf-8");

const encodeString =
  (typeof cachedTextEncoder.encodeInto === "function"
    ? function (arg, view) {
      return cachedTextEncoder.encodeInto(arg, view);
    }
    : function (arg, view) {
      const buf = cachedTextEncoder.encode(arg);
      view.set(buf);
      return {
        read: arg.length,
        written: buf.length,
      };
    });

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length);
    getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len);

  const mem = getUint8Memory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
  if (
    cachegetInt32Memory0 === null ||
    cachegetInt32Memory0.buffer !== wasm.memory.buffer
  ) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachegetInt32Memory0;
}

function getArrayU8FromWasm0(ptr, len) {
  return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
* @param {string} input
* @returns {Uint8Array}
*/
export function base64_decode_from_str(input) {
  var ptr0 = passStringToWasm0(
    input,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  var len0 = WASM_VECTOR_LEN;
  wasm.base64_decode_from_str(8, ptr0, len0);
  var r0 = getInt32Memory0()[8 / 4 + 0];
  var r1 = getInt32Memory0()[8 / 4 + 1];
  var v1 = getArrayU8FromWasm0(r0, r1).slice();
  wasm.__wbindgen_free(r0, r1 * 1);
  return v1;
}

function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1);
  getUint8Memory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
/**
* @param {Uint8Array} input
* @returns {Uint8Array}
*/
export function base64_decode(input) {
  var ptr0 = passArray8ToWasm0(input, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.base64_decode(8, ptr0, len0);
  var r0 = getInt32Memory0()[8 / 4 + 0];
  var r1 = getInt32Memory0()[8 / 4 + 1];
  var v1 = getArrayU8FromWasm0(r0, r1).slice();
  wasm.__wbindgen_free(r0, r1 * 1);
  return v1;
}

let cachedTextDecoder = new TextDecoder(
  "utf-8",
  { ignoreBOM: true, fatal: true },
);

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
* @param {Uint8Array} input
* @returns {string}
*/
export function base64_encode_to_str(input) {
  try {
    var ptr0 = passArray8ToWasm0(input, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.base64_encode_to_str(8, ptr0, len0);
    var r0 = getInt32Memory0()[8 / 4 + 0];
    var r1 = getInt32Memory0()[8 / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_free(r0, r1);
  }
}

/**
* @param {Uint8Array} input
* @returns {Uint8Array}
*/
export function base64_encode(input) {
  var ptr0 = passArray8ToWasm0(input, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.base64_encode(8, ptr0, len0);
  var r0 = getInt32Memory0()[8 / 4 + 0];
  var r1 = getInt32Memory0()[8 / 4 + 1];
  var v1 = getArrayU8FromWasm0(r0, r1).slice();
  wasm.__wbindgen_free(r0, r1 * 1);
  return v1;
}

/**
* @param {string} input
* @returns {Uint8Array}
*/
export function base64_encode_from_str(input) {
  var ptr0 = passStringToWasm0(
    input,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  var len0 = WASM_VECTOR_LEN;
  wasm.base64_encode_from_str(8, ptr0, len0);
  var r0 = getInt32Memory0()[8 / 4 + 0];
  var r1 = getInt32Memory0()[8 / 4 + 1];
  var v1 = getArrayU8FromWasm0(r0, r1).slice();
  wasm.__wbindgen_free(r0, r1 * 1);
  return v1;
}

async function load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get("Content-Type") != "application/wasm") {
          console.warn(
            "`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
            e,
          );
        } else {
          throw e;
        }
      }
    }

    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}

async function init(input) {
  if (typeof input === "undefined") {
    input = import.meta.url.replace(/\.js$/, "_bg.wasm");
  }
  const imports = {};

  if (
    typeof input === "string" ||
    (typeof Request === "function" && input instanceof Request) ||
    (typeof URL === "function" && input instanceof URL)
  ) {
    input = fetch(input);
  }

  const { instance, module } = await load(await input, imports);

  wasm = instance.exports;
  init.__wbindgen_wasm_module = module;

  return wasm;
}

export default init;
