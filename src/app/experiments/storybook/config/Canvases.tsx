"use client";

import { useRef } from "react";
import {
	clearBoard,
	drawCell,
	drawSquareBoard,
} from "@/app/projects/game-snake/Snake/util/drawCanvas";

const cellSize = 10;

const Canvases = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const onClickDraw = (dimensionWidth: number) => {
		if (canvasRef.current !== null) {
			// biome-ignore lint/style/noNonNullAssertion: Expected
			const ctx = canvasRef.current.getContext("2d")!;
			ctx.clearRect(0, 0, 100, 100);
			clearBoard(ctx, canvasRef.current);
			drawCell(
				ctx,
				Math.floor(dimensionWidth * 3.5),
				dimensionWidth,
				cellSize,
				"#FF0000",
			);
			drawSquareBoard(ctx, dimensionWidth, cellSize);
		}
	};

	return (
		<div>
			<div>
				<button type="button" onClick={() => onClickDraw(4)}>
					4 X 4
				</button>
				<button type="button" onClick={() => onClickDraw(10)}>
					10 X 10
				</button>
				<button type="button" onClick={() => onClickDraw(17)}>
					17 X 17
				</button>
			</div>
			<canvas ref={canvasRef} />
		</div>
	);
};

export default Canvases;
