use wasm_bindgen_test::*;
use snake::{World};
use js_sys;

wasm_bindgen_test_configure!(run_in_browser);

/*
* Good reference at https://rustwasm.github.io/docs/book/game-of-life/testing.html
* This is a test for browser, biggest difference is CommonJS vs ECMA6 module export.
* Browser supports on external javascript and are required to be using *export* insted of *module.export*.
*/

#[cfg(test)]
mod tests {
    use super::*;

    const WORLD_SIZE:usize = 10;

    pub fn create_world(snake_pos:usize, reward_idx:usize) -> World {
        World::new(WORLD_SIZE, snake_pos, 2, Some(reward_idx))
    }
    
    #[wasm_bindgen_test]
    fn default_world_created() {
        let world = create_world(0, 9);
        assert_eq!(world.reward_cell(), Some(9));
        assert_eq!(world.points(), 0);
        assert_eq!(world.game_status(), None);
        assert_eq!(world.width(), WORLD_SIZE);

        assert_eq!(world.snake_body_length(), 2);
        assert_eq!(world.snake_head_idx(), 0);
        let snake_cells = world.snake_cells().ok();
        assert!(snake_cells.is_some());
        let snake_js = snake_cells.unwrap();
        assert!(snake_js.is_array());
        assert_eq!(js_sys::JSON::stringify(&snake_js).ok().unwrap(), String::from("[0,0]"));
    }

    #[wasm_bindgen_test]
    fn world_of_different_snake_pos() {
        let world = create_world(9, 9);
        let snake_cells = world.snake_cells().ok();
        assert!(snake_cells.is_some());
        let snake_js = snake_cells.unwrap();
        assert!(snake_js.is_array());
        assert_eq!(js_sys::JSON::stringify(&snake_js).ok().unwrap(), String::from("[9,8]"));
    }
    
}

