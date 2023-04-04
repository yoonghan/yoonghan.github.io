use wasm_bindgen::prelude::*;
use serde::{Serialize};

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: &str);
}

#[wasm_bindgen]
#[derive(PartialEq)]
pub enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq)]
pub enum GameStatus {
    Play,
    Won,
    Lost
}

#[derive(PartialEq, Clone, Copy, Serialize)]
pub struct SnakeCell(usize);

struct Snake {
    body: Vec<SnakeCell>,
    direction: Direction
}

impl Snake {
    fn new(spawn_idx: usize, size: usize) -> Snake {
        let mut body = vec!();

        for i in 0..size {
            let result = spawn_idx.checked_sub(i).ok_or(0);
            let value = match result {
                Ok(subtracted) => subtracted,
                Err(_) => 0
            };
            body.push(SnakeCell(value));
        }

        Snake {
            body,
            direction: Direction::RIGHT
        }
    }
}

#[wasm_bindgen]
pub struct World {
    width: usize,
    snake: Snake,
    next_cell: Option<SnakeCell>,
    reward_cell: Option<usize>,
    size: usize,
    points: usize,
    game_status: Option<GameStatus>
}

#[wasm_bindgen(module="/src/util/random.js")]
extern {
    fn rnd(max: usize) -> usize; 
}

#[wasm_bindgen]
impl World {
    pub fn new(width: usize, snake_pos: usize, snake_size: usize) -> World {
        let controlled_width = match width < snake_size {
            true => snake_size,
            false => width,
        };
        let size = controlled_width * controlled_width;
        let snake = Snake::new(snake_pos, snake_size);

        World {
            width: controlled_width,
            reward_cell: World::generate_reward_cell(size, &snake),
            snake,
            next_cell: None,
            size,
            points: 0,
            game_status: None
        }
    }

    pub fn points(&self) -> usize {
        self.points
    }

    fn generate_reward_cell(size: usize, snake: &Snake) -> Option<usize> {
        let mut reward_cell;
        loop {
            reward_cell =  rnd(size);
            if !snake.body.contains(&SnakeCell(reward_cell)) {
                break;
            }
        }
        Some(reward_cell)
    }

    pub fn reward_cell(&self) -> Option<usize> {
        self.reward_cell
    }

    pub fn width(&self) -> usize {
        self.width
    }

    pub fn snake_head_idx(&self) -> usize {
        self.snake.body[0].0
    }

    // cannot return because due to borrowing rules
    // pub fn snake_cells(&self) -> &Vec<SnakeCell> {
    //     &self.snake.body
    // }

    pub fn snake_cells(&self) -> Result<JsValue, JsValue> {
        Ok(serde_wasm_bindgen::to_value(&self.snake.body)?)
    }

    pub fn snake_body_length(&self) -> usize {
        self.snake.body.len()
    }

    pub fn update_direction(&mut self, direction: Direction) {

        let next_cell = self.gen_next_snake_cell(&direction);
        
        if self.snake.body[1].0 == next_cell.0 { return; }

        self.next_cell = Some(next_cell);
        self.snake.direction = direction;
    }

    pub fn play(&mut self) {
        self.game_status = Some(GameStatus::Play)
    }

    pub fn game_status(&self) -> Option<GameStatus> {
        self.game_status
    }

    pub fn step(&mut self) {

        match self.game_status {
            Some(GameStatus::Play) => {
                let cloned_snake = self.snake.body.clone();

                match self.next_cell {
                    Some(next_cell) => { 
                        self.snake.body[0] = next_cell;
                        self.next_cell = None;
                    }
                    None => {
                        self.snake.body[0] = self.gen_next_snake_cell(&self.snake.direction);
                    }
                }
                
                let len = cloned_snake.len();
                for i in 1..len {
                    self.snake.body[i] = SnakeCell(cloned_snake[i - 1].0);
                }

                if self.snake.body[1..self.snake_body_length()].contains(&self.snake.body[0]) {
                    self.game_status = Some(GameStatus::Lost)
                }
        
                if Some(self.snake_head_idx()) == self.reward_cell {
                    if self.snake_body_length() < self.size {
                        self.points += 1;
                        self.reward_cell = World::generate_reward_cell(self.size, &self.snake);
                    } else {
                        self.reward_cell = None;
                        self.game_status = Some(GameStatus::Won)
                    }

                    self.snake.body.push(SnakeCell(self.snake.body[1].0));
                }
            }
            _ => {}
        }

        
    }

    fn gen_next_snake_cell(&self, direction: &Direction) -> SnakeCell {
        let snake_idx = self.snake_head_idx();
        let (row, col) = self.index_to_cell(snake_idx);

        let (next_row, next_col) =  match direction {
            Direction::RIGHT => {
                (row, (col + 1) % self.width)
            },
            Direction::LEFT => {
                let new_col = if col == 0 as usize {
                    self.width - 1
                } else {
                    (col - 1) % self.width
                };
                (row, new_col)
            },
            Direction::UP => {
                let new_row = if row == 0 {
                    self.width - 1
                } else {
                    (row - 1) % self.width
                };
                (new_row, col)
            },
            Direction::DOWN => {
                ((row + 1) % self.width, col)
            },
        };

        return SnakeCell(self.cell_to_index(next_row, next_col));
    }

    // pub fn update(&mut self) -> bool {
    //     let snake_idx = self.snake_head_idx();
    //     let (row, col) = self.index_to_cell(snake_idx);

    //     let (next_row, next_col) = match self.snake.direction {
    //         Direction::RIGHT => {
    //             (row, (col + 1) % self.width)
    //         },
    //         Direction::LEFT => {
    //             let new_col = if col == 0 as usize {
    //                 self.width - 1
    //             } else {
    //                 (col - 1) % self.width
    //             };
    //             (row, new_col)
    //         },
    //         Direction::UP => {
    //             let new_row = if row == 0 as usize {
    //                 self.width - 1
    //             } else {
    //                 (row - 1) % self.width
    //             };
    //             (new_row, col)
    //         },
    //         Direction::DOWN => {
    //             ((row + 1) % self.width, col)
    //         },
    //     };

    //     self.set_snake_body(self.cell_to_index(next_row, next_col));
    //     col == 0 as usize
    // }

    fn index_to_cell(&self, idx:usize) -> (usize, usize) {
        (idx / self.width, idx % self.width)
    }

    fn cell_to_index(&self, row:usize, col:usize) -> usize {
        (row * self.width) + col
    }
}

//wasm-pack build --target web