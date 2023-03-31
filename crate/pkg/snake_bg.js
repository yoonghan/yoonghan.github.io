import { rnd } from './snippets/snake-776ed4eb60c4951a/src/util/random.ts';

let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
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
/**
* @param {string} name
*/
export function greet(name) {
    const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.greet(ptr0, len0);
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}
/**
*/
export const Direction = Object.freeze({ UP:0,"0":"UP",DOWN:1,"1":"DOWN",LEFT:2,"2":"LEFT",RIGHT:3,"3":"RIGHT", });
/**
*/
export const GameStatus = Object.freeze({ Play:0,"0":"Play",Won:1,"1":"Won",Lost:2,"2":"Lost", });
/**
*/
export class World {

    static __wrap(ptr) {
        const obj = Object.create(World.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_world_free(ptr);
    }
    /**
    * @param {number} width
    * @param {number} snake_pos
    * @param {number} snake_size
    * @returns {World}
    */
    static new(width, snake_pos, snake_size) {
        const ret = wasm.world_new(width, snake_pos, snake_size);
        return World.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    points() {
        const ret = wasm.world_points(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number | undefined}
    */
    reward_cell() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.world_reward_cell(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {number}
    */
    width() {
        const ret = wasm.world_width(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    snake_head_idx() {
        const ret = wasm.world_snake_head_idx(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    snake_cells() {
        const ret = wasm.world_snake_cells(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    snake_body_length() {
        const ret = wasm.world_snake_body_length(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} direction
    */
    update_direction(direction) {
        wasm.world_update_direction(this.ptr, direction);
    }
    /**
    */
    play() {
        wasm.world_play(this.ptr);
    }
    /**
    * @returns {number | undefined}
    */
    game_status() {
        const ret = wasm.world_game_status(this.ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    */
    step() {
        wasm.world_step(this.ptr);
    }
}

export function __wbg_alert_8eb924661f96b64d(arg0, arg1) {
    alert(getStringFromWasm0(arg0, arg1));
};

export function __wbg_rnd_67ab8adcdd8659fa(arg0) {
    const ret = rnd(arg0 >>> 0);
    return ret;
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

