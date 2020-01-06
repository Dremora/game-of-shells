import React from "react";
import { easeInSin, easeOutSin, easeCircle } from "./animations";
import { shuffleDuration } from "./constants";
import { Container as StyledContainer } from "./styles";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";

const Container = ({ id, index, onSelect, state }) => {
  const controls = useAnimation();

  useEffect(() => {
    state.gameState === "turn_start" &&
      id === state.selectedBallID &&
      controls.start({
        boxShadow: "0px 0px 0px 32px rgba(255, 255, 255, 0)"
      });
  }, [state.gameState, id, state.selectedBallID]);

  useEffect(() => {
    if (state.gameState === "shuffling") {
      let moveDirection = "";
      const previousIndex = state.previousContainerPositions.indexOf(id);

      if (index > previousIndex) {
        moveDirection = state.shuffleCount % 2 === 1 ? "up" : "down";
      } else if (index < previousIndex) {
        moveDirection = state.shuffleCount % 2 === 1 ? "down" : "up";
      }

      moveDirection &&
        controls.start({
          y: moveDirection === "up" ? [null, -100, 0] : [null, 100, 0]
        });
    }
  }, [state.gameState, state.previousContainerPositions, index]);

  useEffect(() => {
    controls.start({ scale: 1 });
  }, []);

  return (
    <StyledContainer
      aria-label="Container"
      positionTransition={({ moveDirection }) => ({
        ease: easeCircle,
        duration: shuffleDuration
      })}
      initial={{
        scale: 0
      }}
      animate={controls}
      key={id}
      disabled={state.gameState !== "player_selection"}
      data-testid={id === state.selectedBallID && "selected-container"}
      transition={{
        boxShadow: {
          type: "tween",
          delay: 0.6,
          duration: 0.3,
          from: "0px 0px 0px 0px rgba(255, 255, 255, 0.75)",
          loop: 2
        },
        y: {
          ease: [easeOutSin, easeInSin],
          duration: shuffleDuration
        }
      }}
      whileTap={
        state.gameState === "player_selection" && {
          backgroundColor: "#fff",
          scale: 1.2
        }
      }
      onClick={state.gameState === "player_selection" ? () => onSelect() : null}
    />
  );
};

export default Container;
