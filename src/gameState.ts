import shuffle from "./shuffle";

type State =
  | {
      gameState: "title_screen";
      topScore: number;
    }
  | {
      gameState: "game_over";
      topScore: number;
    }
  | ({
      topScore: number;
      selectedBallID: number;
      level: number;
      containerPositions: number[];
    } & (
      | {
          gameState: "shuffling";
          shuffleCount: number;
          previousContainerPositions: number[];
        }
      | {
          gameState:
            | "turn_start"
            | "player_selection"
            | "correct_answer"
            | "incorrect_answer";
        }
    ));

type Action =
  | {
      type:
        | "start"
        | "start_shuffling"
        | "shuffle"
        | "allow_selection"
        | "next_turn"
        | "game_over"
        | "go_to_title";
    }
  | {
      type: "select_ball";
      ballID: number;
    };

const randomElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

export const reducer = (state: State, action: Action): State => {
  switch (state.gameState) {
    case "title_screen":
      if (action.type === "start") {
        const initialContainerPositions = [1, 2, 3];
        return {
          ...state,
          gameState: "turn_start",
          level: 1,
          selectedBallID: randomElement(initialContainerPositions),
          containerPositions: initialContainerPositions
        };
      }
      break;

    case "turn_start": {
      if (action.type === "start_shuffling") {
        return {
          ...state,
          gameState: "shuffling",
          shuffleCount: Math.floor(Math.random() * 5 + 3),
          previousContainerPositions: state.containerPositions
        };
      }
      break;
    }

    case "shuffling": {
      if (action.type === "shuffle") {
        return {
          ...state,
          containerPositions: shuffle(state.containerPositions),
          previousContainerPositions: state.containerPositions,
          shuffleCount: state.shuffleCount - 1
        };
      } else if (action.type === "allow_selection") {
        return {
          ...state,
          gameState: "player_selection"
        };
      }
      break;
    }

    case "player_selection": {
      if (action.type === "select_ball") {
        return {
          ...state,
          gameState:
            action.ballID === state.selectedBallID
              ? "correct_answer"
              : "incorrect_answer"
        };
      }
    }
    case "correct_answer": {
      if (action.type === "next_turn") {
        return {
          ...state,
          level: state.level + 1,
          gameState: "turn_start",
          selectedBallID: randomElement(state.containerPositions)
        };
      }
    }

    case "incorrect_answer": {
      if (action.type === "game_over") {
        return {
          topScore: Math.max(state.level - 1, state.topScore),
          gameState: "game_over"
        };
      }
    }

    case "game_over": {
      if (action.type === "go_to_title") {
        return {
          topScore: state.topScore,
          gameState: "title_screen"
        };
      }
    }
  }
  throw new Error(`${state.gameState} is incompatible with ${action.type}`);
};
