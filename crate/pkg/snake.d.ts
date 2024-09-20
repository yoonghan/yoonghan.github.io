/* tslint:disable */
/* eslint-disable */
/**
*/
export enum GameStatus {
  Play = 0,
  Won = 1,
  Lost = 2,
}
/**
*/
export enum Direction {
  UP = 0,
  DOWN = 1,
  LEFT = 2,
  RIGHT = 3,
}
/**
*/
export class World {
  free(): void;
/**
* @param {number} width
* @param {number} snake_pos
* @param {number} snake_size
* @param {number | undefined} [reward_idx]
* @returns {World}
*/
  static new(width: number, snake_pos: number, snake_size: number, reward_idx?: number): World;
/**
* @returns {number}
*/
  points(): number;
/**
* @returns {number | undefined}
*/
  reward_cell(): number | undefined;
/**
* @returns {number}
*/
  width(): number;
/**
* @returns {number}
*/
  snake_head_idx(): number;
/**
* @returns {any}
*/
  snake_cells(): any;
/**
* @returns {number}
*/
  snake_body_length(): number;
/**
* @param {Direction} direction
*/
  update_direction(direction: Direction): void;
/**
*/
  play(): void;
/**
* @returns {GameStatus | undefined}
*/
  game_status(): GameStatus | undefined;
/**
*/
  step(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_world_free: (a: number, b: number) => void;
  readonly world_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly world_points: (a: number) => number;
  readonly world_reward_cell: (a: number, b: number) => void;
  readonly world_width: (a: number) => number;
  readonly world_snake_head_idx: (a: number) => number;
  readonly world_snake_cells: (a: number, b: number) => void;
  readonly world_snake_body_length: (a: number) => number;
  readonly world_update_direction: (a: number, b: number) => void;
  readonly world_play: (a: number) => void;
  readonly world_game_status: (a: number) => number;
  readonly world_step: (a: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
