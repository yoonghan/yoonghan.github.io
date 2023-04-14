use snake::{World, }; 
use wasm_bindgen_test::*;

#[wasm_bindgen_test]
fn test_world_initialized_value() {
    let world = World::new(10, 9, 8, None);
    assert_eq!(world.game_status(), None);
    assert_eq!(world.points(), 0);
    assert_eq!(world.snake_head_idx(), 9);
    assert_eq!(world.snake_body_length(), 8);
}

#[wasm_bindgen_test]
fn test_snake_at_pos_0_are_drawn_together() {
    let world = World::new(10, 0, 8, None);
    assert_eq!(world.snake_head_idx(), 0);
    assert_eq!(world.snake_body_length(), 8);
}

#[wasm_bindgen_test]
fn test_width_cannot_be_smaller_than_snake_size() {
    let world = World::new(1, 0, 8, None);
    assert_eq!(world.snake_body_length(), 8);
    assert_eq!(world.width(), 8);
}

#[wasm_bindgen_test]
fn test_reward_cell_index_can_be_suggested() {
    let world = World::new(10, 0, 2, Some(3));
    assert_eq!(world.reward_cell(), Some(3));
    let world = World::new(10, 0, 2, Some(4));
    assert_eq!(world.reward_cell(), Some(4));
    let world = World::new(999, 0, 2, None);
    assert_ne!(world.reward_cell(), Some(999));
}

#[wasm_bindgen_test]
fn test_reward_cell_index_should_not_collide_with_snake_start_pos() {
    let world = World::new(3, 0, 2, Some(0));
    assert_ne!(world.reward_cell(), Some(0));
}
