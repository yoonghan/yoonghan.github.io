import { act, fireEvent, render, screen } from "@testing-library/react";
import testLibUserEvent from "@testing-library/user-event";
import { spyReload } from "@/__tests__/mocks/locationMock";
import { KeyboardKeys } from "@/components/PopupKeyboard";
import "@/__tests__/mocks/snakeWasmMock";
import Board from "./Board";
import { GameContext } from "./GameContext";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Board", { timeout: 60000 }, () => {
	let userEvent = testLibUserEvent;

	it("should render screen with a start button", async () => {
		render(
			<Board
				worldDimension={2}
				snakePos={0}
				snakeSize={2}
				snakeSpeed={100}
				cellSize={10}
			/>,
		);
		expect(
			await screen.findByRole("button", { name: "Play" }),
		).toBeInTheDocument();
	});

	describe("being played", () => {
		beforeEach(() => {
			userEvent = testLibUserEvent.setup();
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		const renderComponent = async (isGameStarted = false) => {
			let rewardInfo: undefined | { initialRewardCellPos?: number };
			const rewardInformationCallback = (initialRewardCellPos?: number) => {
				rewardInfo = {
					initialRewardCellPos,
				};
			};
			render(
				<GameContext.Provider
					value={{
						isGameStarted,
						setGameStarted: (_: boolean) => {},
					}}
				>
					<Board
						worldDimension={2}
						snakePos={0}
						snakeSize={2}
						snakeSpeed={100}
						cellSize={10}
						rewardInformationCallback={rewardInformationCallback}
						startRewardCell={3}
					/>
				</GameContext.Provider>,
			);
			expect(
				await screen.findByRole("button", { name: "Play" }),
			).toBeInTheDocument();
			return { rewardInfo };
		};

		const clickPlayButton = async () => {
			fireEvent.click(screen.getByRole("button", { name: "Play" }));
		};

		it("should render reload on Play of game if game is start", async () => {
			await renderComponent(true);

			await clickPlayButton();

			expect(spyReload).toHaveBeenCalled();
		});

		it("should be able to press UP", async () => {
			await renderComponent();

			await clickPlayButton();

			expect(await screen.findByText("Playing")).toBeInTheDocument();
			await wait(1000);
			fireEvent.keyDown(window, { key: KeyboardKeys.UP });
			await wait(1000);
			expect(await screen.findByText("1")).toBeInTheDocument();
		});

		it("should be able to play the game and move to Lost after play", async () => {
			await renderComponent();

			await clickPlayButton();

			expect(await screen.findByText("Playing")).toBeInTheDocument();
			await wait(1000);
			fireEvent.keyDown(window, { key: KeyboardKeys.DOWN });
			await wait(1000);
			expect(await screen.findByText("1")).toBeInTheDocument();
			await wait(1500);
			expect(await screen.findByText("Lost")).toBeInTheDocument();
		});

		it("should be able to Win the game play", async () => {
			await renderComponent();

			await clickPlayButton();

			expect(await screen.findByText("Playing")).toBeInTheDocument();
			await wait(1000);
			fireEvent.keyDown(window, { key: KeyboardKeys.DOWN });
			await wait(1000);
			expect(await screen.findByText("1")).toBeInTheDocument();
			fireEvent.keyDown(window, { key: KeyboardKeys.LEFT });
			await wait(1000);
			if (screen.queryByText("2")) {
				//win if reward spawns on cell = 2
				expect(await screen.findByText("Won")).toBeInTheDocument();
			} else {
				//reward spawns on cell = 0
				fireEvent.keyDown(window, { key: KeyboardKeys.UP });
				await wait(1000);
				expect(await screen.findByText("Won")).toBeInTheDocument();
				expect(screen.getByText("2")).toBeInTheDocument();
			}
		});

		it("should be able to Win the game play with Right direction", async () => {
			await renderComponent();

			await clickPlayButton();

			expect(await screen.findByText("Playing")).toBeInTheDocument();
			await wait(1000);
			fireEvent.keyDown(window, { key: KeyboardKeys.DOWN });
			await wait(1000);
			expect(await screen.findByText("1")).toBeInTheDocument();
			fireEvent.keyDown(window, { key: KeyboardKeys.RIGHT });
			await wait(1000);
			if (screen.queryByText("2")) {
				//win if reward spawns on cell = 2
				expect(await screen.findByText("Won")).toBeInTheDocument();
			} else {
				//reward spawns on cell = 0
				fireEvent.keyDown(window, { key: KeyboardKeys.UP });
				await wait(1000);
				expect(await screen.findByText("Won")).toBeInTheDocument();
				expect(screen.getByText("2")).toBeInTheDocument();
			}
		});
	});
});
