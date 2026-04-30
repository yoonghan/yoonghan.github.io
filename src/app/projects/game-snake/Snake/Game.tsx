import { useContext, useEffect, useState } from "react";
import { Direction, GameStatus, type World } from "snake-game/snake";
import { useInterval } from "usehooks-ts";
import Button from "@/components/Button";
import PopupKeyboard, { KeyboardKeys } from "@/components/PopupKeyboard";
import { reload } from "@/util/location";
import { GameContext } from "./GameContext";
import styles from "./Snake.module.css";
import { drawCell, drawSquareBoard } from "./util/drawCanvas";

export type GameProps = {
	world: World;
	worldWidth: number;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	snakeSpeed: number;
	rewardInformationCallback?: (initialRewardCellPos?: number) => void;
};

type Props = GameProps & { cellSize: number };

const Game = ({
	world,
	worldWidth,
	canvas,
	ctx,
	snakeSpeed,
	cellSize,
	rewardInformationCallback,
}: Props) => {
	const gameContext = useContext(GameContext);
	const [status, setStatus] = useState<number | undefined>(undefined);
	const [points, setPoints] = useState(0);
	const [buttonText, setButtonText] = useState("Play");

	const getStatusAsText = (status: number | undefined) => {
		switch (status) {
			case GameStatus.Play:
				return "Playing";
			case GameStatus.Won:
				return "Won";
			case GameStatus.Lost:
				return "Lost";
			default:
				return "None";
		}
	}

	const updateStatusAndPoints = () => {
		const latestStatus = world.game_status();
		const latestPoints = world.points();

		if (status !== latestStatus) setStatus(latestStatus);
		if (points !== latestPoints) setPoints(latestPoints);
	}

	const drawBoard = () => {
		drawSquareBoard(ctx, worldWidth, cellSize);
	}

	const drawSnake = () => {
		const snakeCells = world.snake_cells() as number[];
		snakeCells
			.filter((snakeCellIdx, i) => !(i > 0 && snakeCellIdx === snakeCells[0]))
			.forEach((snakeCellIdx, i) => {
				drawCell(
					ctx,
					snakeCellIdx,
					worldWidth,
					cellSize,
					i === 0 ? "#7878db" : "#000000",
				);
			});
	}

	const drawReward = () => {
		const idx = world.reward_cell();
		if (idx) {
			drawCell(ctx, idx, worldWidth, cellSize);
		}

		if (rewardInformationCallback) {
			rewardInformationCallback(idx);
		}
	}

	const paint = () => {
		drawBoard();
		drawSnake();
		drawReward();
		updateStatusAndPoints();
	}

	const onKeyboardClick =
		(key: KeyboardKeys) => {
			switch (key) {
				case KeyboardKeys.UP:
					world.update_direction(Direction.UP);
					break;
				case KeyboardKeys.DOWN:
					world.update_direction(Direction.DOWN);
					break;
				case KeyboardKeys.LEFT:
					world.update_direction(Direction.LEFT);
					break;
				case KeyboardKeys.RIGHT:
					world.update_direction(Direction.RIGHT);
					break;
			}
		}

	const onPlayClicked = () => {
		if (gameContext.isGameStarted) {
			reload();
		} else {
			if (gameContext.setGameStarted) {
				gameContext.setGameStarted(true);
				setButtonText("Playing...");
				world.play();
				updateStatusAndPoints();
			}
		}
	}

	useEffect(() => {
		canvas.width = worldWidth * cellSize;
		canvas.height = worldWidth * cellSize;
		paint();
	}, [canvas, cellSize, worldWidth, paint]);

	const intervalDelay = (() => {
		if (status === GameStatus.Play) {
			return (snakeSpeed / 100) * 1000;
		} else {
			return null;
		}
	})()

	useInterval(() => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		world.step();
		paint();
	}, intervalDelay);

	return (
		<>
			<div className={styles.contoller}>
				<div className={styles.scoreBoard}>
					<div>
						<strong>Status:</strong> <span>{getStatusAsText(status)}</span>
					</div>
					<div>
						<strong>Points:</strong> <span>{points}</span>
					</div>
				</div>
				<Button
					styling={{ small: true, inverted: false }}
					onClick={onPlayClicked}
				>
					{buttonText}
				</Button>
			</div>

			<div className={styles.keyboard}>
				<PopupKeyboard
					onClickCallback={onKeyboardClick}
					buttonText={"Popup Keyboard"}
					enableKeyboardListener={world.game_status() !== undefined}
				/>
			</div>
		</>
	);
};

export default Game;
