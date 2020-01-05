import React, { useEffect, useReducer, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

import { reducer as gameReducer } from "./gameState";
import Container from "./Container";
import {
  Continue,
  Text,
  LogoText,
  LevelText,
  Top,
  Bottom,
  StartButton,
  ContinueButton,
  Containers,
  Center
} from "./styles";

import { start, continue_, text, textCorrect, textWrong } from "./animations";

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
      }, shuffleDuration * 1000);
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
      const timeoutID = setTimeout(() => dispatch({ type: "game_over" }), 2000);
      return () => clearTimeout(timeoutID);
    }
  }, [state.gameState]);

  const startGame = useCallback(() => dispatch({ type: "start" }), []);

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
          <StartButton
            onClick={startGame}
            variants={start}
            animate="flashing"
            type="button"
          >
            Start
          </StartButton>
        )}
        {state.gameState === "game_over" && <Text>GAME OVER</Text>}
        {state.gameState !== "title_screen" && state.gameState !== "game_over" && (
          <Containers>
            {state.containerPositions.map((id, index) => (
              <Container
                onSelect={() => dispatch({ type: "select_ball", ballID: id })}
                index={index}
                id={id}
                key={id}
                state={state}
              />
            ))}
          </Containers>
        )}
      </Center>
      <Bottom>
        {state.gameState === "title_screen" && state.topScore > 0 && (
          <Text {...text} key="selection_text">
            Top level: {state.topScore}
          </Text>
        )}
        {state.gameState === "game_over" && (
          <Continue
            variants={continue_}
            initial="hidden"
            animate="visible"
            key="continue"
          >
            <ContinueButton onClick={() => dispatch({ type: "go_to_title" })}>
              continue
            </ContinueButton>
          </Continue>
        )}
        {state.gameState !== "title_screen" && state.gameState !== "game_over" && (
          <AnimatePresence exitBeforeEnter>
            {state.gameState === "player_selection" && (
              <Text {...text} positionTransition key="selection_text">
                Which one?
              </Text>
            )}
            {state.gameState === "correct_answer" && (
              <Text {...textCorrect} positionTransition key="correct_answer">
                Correct!
              </Text>
            )}
            {state.gameState === "incorrect_answer" && (
              <Text {...textWrong} positionTransition key="incorrect_answer">
                Wrong!
              </Text>
            )}
          </AnimatePresence>
        )}
      </Bottom>
    </>
  );
};

export default Game;
