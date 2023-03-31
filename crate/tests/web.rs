use wasm_bindgen_test::*;
use snake::{World, GameStatus};

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn lib_test() {
    //dummy, not sure how to do a test here. It's suppose to run a browser test!
    assert_eq!(1 + 1, 2);
}