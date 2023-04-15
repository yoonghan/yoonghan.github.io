use snake::{ World, GameStatus }; 
use wasm_bindgen_test::*;


mod restrictions {
    use super::*;

    #[wasm_bindgen_test]
    fn board_width_cannot_be_smaller_than_snake_size() {
        let world = World::new(1, 0, 8, None);
        assert_eq!(world.snake_body_length(), 8);
        assert_eq!(world.width(), 8);
    }

    #[wasm_bindgen_test]
    fn reward_cell_start_index_can_be_suggested() {
        let world = World::new(10, 0, 2, Some(3));
        assert_eq!(world.reward_cell(), Some(3));
        let world = World::new(10, 0, 2, Some(4));
        assert_eq!(world.reward_cell(), Some(4));
        let world = World::new(999, 0, 2, None);
        assert_ne!(world.reward_cell(), Some(999));
    }

    #[wasm_bindgen_test]
    fn reward_cell_start_index_should_not_collide_with_snake_start_pos() {
        let world = World::new(3, 0, 2, Some(0));
        assert_ne!(world.reward_cell(), Some(0));
    }

    #[wasm_bindgen_test]
    fn snake_length_must_never_be_less_than_2() {
        let world = World::new(3, 0, 1, Some(0));
        assert_eq!(world.snake_body_length(), 2);
        let world = World::new(3, 0, 3, Some(0));
        assert_eq!(world.snake_body_length(), 3);
    }

}

mod movement {
    use super::*;

    fn create_movement_world() -> World {
        World::new(4, 1, 2, Some(15))
    }

    fn assert_snake_movement(world: &World, expected_pos: &str) {
        let snake_cells = world.snake_cells().ok();
        let snake_js = snake_cells.unwrap();
        assert_eq!(js_sys::JSON::stringify(&snake_js).ok().unwrap(), expected_pos);
    }

    #[wasm_bindgen_test]
    fn defaults_to_move_right_on_play() {
        let mut world = create_movement_world();
        assert_snake_movement(&world, "[1,0]");
        world.play();
        world.step();
        assert_snake_movement(&world, "[2,1]");
    }

    #[wasm_bindgen_test]
    fn can_change_direction_once_moved() {
        let mut world = create_movement_world();
        world.play();
        world.step();
        assert_snake_movement(&world, "[2,1]");
        world.update_direction(snake::Direction::DOWN);
        world.step();
        assert_snake_movement(&world, "[6,2]");
        world.step();
        assert_snake_movement(&world, "[10,6]");
        world.update_direction(snake::Direction::LEFT);
        world.step();
        assert_snake_movement(&world, "[9,10]");
        world.step();
        assert_snake_movement(&world, "[8,9]");
        world.update_direction(snake::Direction::UP);
        world.step();
        assert_snake_movement(&world, "[4,8]");
        world.step();
        assert_snake_movement(&world, "[0,4]");
    }

    #[wasm_bindgen_test]
    fn can_loop_on_right_movement_after_play() {
        let mut world = create_movement_world();
        world.play();
        world.step();
        world.step();
        world.step();
        assert_snake_movement(&world, "[0,3]");
    }

    #[wasm_bindgen_test]
    fn can_loop_on_down_movement_after_play() {
        let mut world = create_movement_world();
        world.update_direction(snake::Direction::DOWN);
        world.play();
        world.step();
        world.step();
        world.step();
        world.step();
        assert_snake_movement(&world, "[1,13]");
    }

    #[wasm_bindgen_test]
    fn can_loop_on_up_movement_after_play() {
        let mut world = create_movement_world();
        world.update_direction(snake::Direction::UP);
        world.play();
        world.step();
        assert_snake_movement(&world, "[13,1]");
    }

    #[wasm_bindgen_test]
    fn opposite_direction_are_cancelled() {
        let mut world = create_movement_world();
        world.update_direction(snake::Direction::LEFT);
        world.play();
        world.step();
        assert_snake_movement(&world, "[2,1]");
        world.update_direction(snake::Direction::LEFT);
        world.step();
        assert_snake_movement(&world, "[3,2]");
    }

    #[wasm_bindgen_test]
    fn can_loop_on_left_movement_after_play() {
        let mut world = create_movement_world();
        world.update_direction(snake::Direction::DOWN);
        world.play();
        world.step();
        assert_snake_movement(&world, "[5,1]");
        world.update_direction(snake::Direction::LEFT);
        world.step();
        assert_snake_movement(&world, "[4,5]");
        world.step();
        assert_snake_movement(&world, "[7,4]");
    }

}

mod growth {
    use super::*;

    fn create_growth_world() -> World {
        World::new(3, 0, 2, Some(4))
    }

    #[wasm_bindgen_test]
    fn can_grow_after_play() {
        let mut world = create_growth_world();
        assert_eq!(world.snake_body_length(), 2);
        world.play();
        world.step();
        world.update_direction(snake::Direction::DOWN);
        world.step();
        assert_eq!(world.snake_body_length(), 3);
    }

    #[wasm_bindgen_test]
    fn grow_takes_after_next_move() {
        let mut world = create_growth_world();
        world.play();
        world.step();
        world.update_direction(snake::Direction::DOWN);
        world.step();
        let snake_cells = world.snake_cells().ok();
        let snake_js = snake_cells.unwrap();
        assert_eq!(js_sys::JSON::stringify(&snake_js).ok().unwrap(), "[4,1,1]");
        world.step();
        let snake_cells = world.snake_cells().ok();
        let snake_js = snake_cells.unwrap();
        assert_eq!(js_sys::JSON::stringify(&snake_js).ok().unwrap(), "[7,4,1]");
    }

    #[wasm_bindgen_test]
    fn snake_body_adaptable() {
        let world = World::new(3, 0, 2, Some(4));
        let snake_cells = world.snake_cells().ok();
        let snake_js = snake_cells.unwrap();
        assert_eq!(js_sys::JSON::stringify(&snake_js).ok().unwrap(), "[0,0]");
        let world = World::new(3, 1, 2, Some(4));
        let snake_cells = world.snake_cells().ok();
        let snake_js = snake_cells.unwrap();
        assert_eq!(js_sys::JSON::stringify(&snake_js).ok().unwrap(), "[1,0]");
    }
}


mod status_and_points {
    use super::*;

    fn create_status_point_world() -> World {
        World::new(2, 1, 2, Some(3))
    }

    #[wasm_bindgen_test]
    fn default_points_and_status() {
        let world = create_status_point_world();
        assert_eq!(world.game_status(), None);
        assert_eq!(world.points(), 0);
    }

    #[wasm_bindgen_test]
    fn status_is_play_when_start() {
        let mut world = create_status_point_world();
        world.play();
        assert_eq!(world.game_status(), Some(GameStatus::Play));
    }

    #[wasm_bindgen_test]
    fn points_increase_when_rewards_is_taken() {
        let mut world = create_status_point_world();
        world.play();
        assert_eq!(world.points(), 0);
        world.update_direction(snake::Direction::DOWN);
        world.step();
        assert_eq!(world.points(), 1);
    }

    #[wasm_bindgen_test]
    fn lost_if_snake_body_collide() {
        let mut world = create_status_point_world();
        world.play();
        assert_eq!(world.points(), 0);
        world.update_direction(snake::Direction::DOWN);
        world.step();
        world.step();
        assert_eq!(world.game_status(), Some(GameStatus::Lost));
    }

    #[wasm_bindgen_test]
    fn win_if_snake_body_complete_fill_board() {
        let mut world = create_status_point_world();
        world.play();
        assert_eq!(world.points(), 0);
        world.update_direction(snake::Direction::DOWN);
        world.step();
        world.update_direction(snake::Direction::LEFT);
        world.step();
        world.update_direction(snake::Direction::UP);
        world.step();
        assert_eq!(world.game_status(), Some(GameStatus::Won));
        assert_eq!(world.points(), 2);
    }

}
