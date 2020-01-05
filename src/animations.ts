export const easeInSin = function(t) {
  return 1 + Math.sin((Math.PI / 2) * (t - 1));
};

export const easeOutSin = function(t) {
  return Math.sin((Math.PI / 2) * t);
};

export const easeCircle = function(t) {
  return 0.5 + Math.sin(Math.PI * (t - 0.5)) / 2;
};

export const text = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const level = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "-100%" }
};

export const textCorrect = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: {
    opacity: 0,
    scale: 3,
    transition: {
      duration: 1
    }
  }
};

export const textWrong = {
  initial: { opacity: 0 },
  animate: {
    opacity: [null, 1, 0],
    scale: [null, 1, 3],
    transition: {
      duration: 1.5,
      times: [0, 0.4, 1]
    }
  },
  exit: {}
};

export const start = {
  flashing: {
    opacity: [1, 0.3],
    transition: {
      opacity: {
        duration: 1.0,
        yoyo: Infinity
      }
    }
  }
};
export const continue_ = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [1, 0.3],
    transition: {
      opacity: {
        delay: 1.5,
        duration: 1.0,
        yoyo: Infinity
      }
    }
  }
};
