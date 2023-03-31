use snake::{World, }; 
use wasm_bindgen_test::*;

#[wasm_bindgen_test]
fn test_world_initialized_value() {
    let world = World::new(10, 9, 8);
    assert_eq!(world.game_status(), None);
    assert_eq!(world.points(), 0);
    assert_eq!(world.snake_head_idx(), 9);
    assert_eq!(world.snake_body_length(), 8);
}

#[wasm_bindgen_test]
fn test_snake_at_pos_0_are_drawn_together() {
    let world = World::new(10, 0, 8);
    assert_eq!(world.snake_head_idx(), 0);
    assert_eq!(world.snake_body_length(), 8);
}

#[wasm_bindgen_test]
fn test_width_cannot_be_smaller_than_snake_size() {
    let world = World::new(1, 0, 8);
    assert_eq!(world.snake_body_length(), 8);
    assert_eq!(world.width(), 8);
}

