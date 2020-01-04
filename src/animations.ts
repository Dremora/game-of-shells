import posed, { PoseGroup } from "react-pose";

import {
  Container as StyledContainer,
  BottomText as StyledBottomText
} from "./styles";

import { shuffleDuration } from "./constants";

const easeInSin = function(t) {
  return 1 + Math.sin((Math.PI / 2) * t - Math.PI / 2);
};
const easeOutSin = function(t) {
  return Math.sin((Math.PI / 2) * t);
};

export const BottomText = posed(StyledBottomText)({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

export const Continue = posed.div({
  enter: {
    opacity: 1,
    transition: {
      opacity: {
        value: 1,
        delay: 1500,
        duration: 2000
      }
    }
  },
  exit: {
    opacity: 0
  }
});

export const Container = posed(StyledContainer)({
  highlight: {
    boxShadow: "0px 0px 0px 32px rgba(255, 255, 255, 0)",
    transition: {
      boxShadow: {
        type: "tween",
        delay: 600,
        duration: 300,
        from: "0px 0px 0px 0px rgba(255, 255, 255, 0.75)",
        loop: 2
      }
    }
  },
  exit: {
    zoom: 0
  },
  enter: {
    zoom: 1
  },
  flip: {
    y: 0,
    transition: ({ moveDirection }) => ({
      y: {
        type: "keyframes",
        easings: [easeOutSin, easeInSin],
        duration: shuffleDuration,
        values:
          moveDirection === "up"
            ? [0, -100, 0]
            : moveDirection === "down"
            ? [0, 100, 0]
            : [0, 0, 0]
      },
      default: {
        ease: "easeOut",
        duration: shuffleDuration
      }
    })
  }
});
