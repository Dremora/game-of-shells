import React, { useEffect, useReducer, useCallback } from "react";
import { PoseGroup } from "react-pose";

import { reducer as gameReducer } from "./gameState";
import {
  LogoText,
  LevelText,
  Top,
  Bottom,
  StartButton,
  ContinueButton,
  Containers,
  Center
} from "./styles";

import { Continue, Container, BottomText } from "./animations";

import { shuffleDuration } from "./constants";

const Game = () => {
  const [state, dispatch] = useReducer(gameReducer, {
    gameState: "title_screen",
    topScore: 0
  });

  useEffect(() => {
    if (state.gameState === "shuffling") {
      const timeoutID = setTimeout(() => {
        dispatch({
          type: state.shuffleCount > 0 ? "shuffle" : "allow_selection"
        });
      }, shuffleDuration);
      return () => clearTimeout(timeoutID);
    }
  }, [state]);

  useEffect(() => {
    if (state.gameState === "turn_start") {
      const timeoutID = setTimeout(
        () => dispatch({ type: "start_shuffling" }),
        1000
      );
      return () => clearTimeout(timeoutID);
    }

    if (state.gameState === "correct_answer") {
      const timeoutID = setTimeout(() => dispatch({ type: "next_turn" }), 1000);
      return () => clearTimeout(timeoutID);
    }

    if (state.gameState === "incorrect_answer") {
      const timeoutID = setTimeout(() => dispatch({ type: "game_over" }), 1000);
      return () => clearTimeout(timeoutID);
    }
  }, [state.gameState]);

  const start = useCallback(() => dispatch({ type: "start" }), []);

  return (
    <>
      <Top>
        {state.gameState === "title_screen" && (
          <LogoText>Game of Shells</LogoText>
        )}
        {state.gameState !== "title_screen" &&
          state.gameState !== "game_over" && (
            <LevelText>Level {state.level}</LevelText>
          )}
      </Top>
      <Center>
        {state.gameState === "title_screen" && (
          <StartButton onClick={start} type="button">
            Start
          </StartButton>
        )}
        {state.gameState === "game_over" && <BottomText>GAME OVER</BottomText>}
        {state.gameState !== "title_screen" && state.gameState !== "game_over" && (
          <Containers>
            <PoseGroup animateOnMount>
              {state.containerPositions.map((id, index) => {
                let moveDirection = "";
                if (state.gameState === "shuffling") {
                  const previousIndex = state.previousContainerPositions.indexOf(
                    id
                  );

                  if (index > previousIndex) {
                    moveDirection = "up";
                  } else if (index < previousIndex) {
                    moveDirection = "down";
                  }
                }

                const highlight =
                  state.gameState === "turn_start" &&
                  id === state.selectedBallID;

                return (
                  <Container
                    pose={highlight && "highlight"}
                    key={id}
                    moveDirection={moveDirection}
                    disabled={state.gameState !== "player_selection"}
                    onClick={
                      state.gameState === "player_selection"
                        ? () => dispatch({ type: "select_ball", ballID: id })
                        : null
                    }
                  />
                );
              })}
            </PoseGroup>
          </Containers>
        )}
      </Center>
      <Bottom>
        {state.gameState === "title_screen" && state.topScore > 0 && (
          <BottomText key="selection_text">
            Top level: {state.topScore}
          </BottomText>
        )}
        {state.gameState === "game_over" && (
          <PoseGroup animateOnMount>
            <Continue key="continue">
              <ContinueButton onClick={() => dispatch({ type: "go_to_title" })}>
                continue
              </ContinueButton>
            </Continue>
          </PoseGroup>
        )}
        {state.gameState !== "title_screen" && state.gameState !== "game_over" && (
          <PoseGroup>
            {state.gameState === "player_selection" && (
              <BottomText key="selection_text">Which one?</BottomText>
            )}
            {state.gameState === "correct_answer" && (
              <BottomText key="answer">Correct!</BottomText>
            )}
            {state.gameState === "incorrect_answer" && (
              <BottomText key="answer">Wrong!</BottomText>
            )}
          </PoseGroup>
        )}
      </Bottom>
    </>
  );
};

export default Game;
