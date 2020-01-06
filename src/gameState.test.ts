import { reducer } from "./gameState";

describe("gameState", () => {
  describe("reducer", () => {
    it("performs the initial shuffle", () => {
      const newState = reducer(
        {
          gameState: "turn_start",
          topScore: 0,
          selectedBallID: 1,
          level: 1,
          containerPositions: [1, 2, 3]
        },
        { type: "ui_ready" }
      );
      expect(newState.gameState === "shuffling");
      if (newState.gameState === "shuffling") {
        expect(newState.containerPositions).not.toStrictEqual([1, 2, 3]);
        expect(newState.previousContainerPositions).toStrictEqual([1, 2, 3]);
        expect(newState.shuffleCount).toBeGreaterThanOrEqual(2);
        expect(newState.shuffleCount).toBeLessThanOrEqual(6);
      }
    });

    it("shuffles if any shuffles are left", () => {
      const newState = reducer(
        {
          gameState: "shuffling",
          topScore: 0,
          selectedBallID: 1,
          level: 1,
          shuffleCount: 1,
          containerPositions: [1, 2, 3],
          previousContainerPositions: [3, 2, 1]
        },
        { type: "ui_ready" }
      );
      expect(newState.gameState === "shuffling");
      if (newState.gameState === "shuffling") {
        expect(newState.shuffleCount).toBe(0);
        expect(newState.containerPositions).not.toStrictEqual([1, 2, 3]);
        expect(newState.previousContainerPositions).toStrictEqual([1, 2, 3]);
      }
    });

    it("allows player selection after the last shuffle", () => {
      const newState = reducer(
        {
          gameState: "shuffling",
          topScore: 0,
          selectedBallID: 1,
          level: 1,
          shuffleCount: 0,
          containerPositions: [1, 2, 3],
          previousContainerPositions: [3, 2, 1]
        },
        { type: "ui_ready" }
      );
      expect(newState.gameState === "player_selection");
    });

    it("handles correct container selection", () => {
      const newState = reducer(
        {
          gameState: "player_selection",
          topScore: 0,
          selectedBallID: 2,
          level: 1,
          containerPositions: [1, 2, 3]
        },
        { type: "select_ball", ballID: 2 }
      );
      expect(newState.gameState === "correct_answer");
    });

    it("handles incorrect container selection", () => {
      const newState = reducer(
        {
          gameState: "player_selection",
          topScore: 0,
          selectedBallID: 2,
          level: 1,
          containerPositions: [1, 2, 3]
        },
        { type: "select_ball", ballID: 3 }
      );
      expect(newState.gameState === "incorrect_answer");
    });
  });
});
