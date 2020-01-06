import React, { useEffect, useReducer, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

import { reducer as gameReducer } from "./gameState";
import Container from "./Container";
import ViewOnGithub from "./ViewOnGithub";
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

import {
  level,
  start,
  continue_,
  text,
  textCorrect,
  textWrong
} from "./animations";

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
          type: "ui_ready"
        });
      }, shuffleDuration * 1000);
      return () => clearTimeout(timeoutID);
    }
  }, [state.gameState, state.gameState === "shuffling" && state.shuffleCount]);

  useEffect(() => {
    if (
      state.gameState === "turn_start" ||
      state.gameState === "correct_answer"
    ) {
      const timeoutID = setTimeout(() => dispatch({ type: "ui_ready" }), 1000);
      return () => clearTimeout(timeoutID);
    }

    if (state.gameState === "incorrect_answer") {
      const timeoutID = setTimeout(() => dispatch({ type: "ui_ready" }), 2000);
      return () => clearTimeout(timeoutID);
    }
  }, [state.gameState]);

  const startGame = useCallback(() => dispatch({ type: "start" }), []);

  return (
    <>
      {state.gameState === "title_screen" && <ViewOnGithub />}
      <Top>
        {state.gameState === "title_screen" && (
          <LogoText>Game of Shells</LogoText>
        )}
        {state.gameState !== "title_screen" && state.gameState !== "game_over" && (
          <AnimatePresence exitBeforeEnter>
            <LevelText {...level} key={state.level}>
              Level {state.level}
            </LevelText>
          </AnimatePresence>
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
