import styled from "styled-components";
import { motion } from "framer-motion";

export const LogoText = styled.h1`
  font-size: 40px;
  color: red;
  margin: 20px;
  text-align: center;
`;

export const LevelText = styled.p`
  font-size: 20px;
  color: blue;
  margin: 20px;
`;

export const StartButton = styled.button`
  font-family: inherit;
  appearance: none;
  background: none;
  cursor: pointer;
  border: none;
  padding: 0;
  color: white;
  font-size: 30px;
`;

export const Continue = motion.div;

export const ContinueButton = styled.button`
  font-family: inherit;
  appearance: none;
  background: none;
  cursor: pointer;
  border: none;
  padding: 0;
  color: white;
  font-size: 20px;
`;

export const Containers = styled.div`
  display: flex;
`;

export const Top = styled.div`
  flex-basis: 0;
  flex-shrink: 1;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Bottom = styled.div`
  flex-basis: 0;
  flex-shrink: 1;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
`;

export const Container = styled(motion.button)`
  appearance: none;
  background: none;
  cursor: pointer;
  border: none;
  padding: 0;
  width: 80px;
  height: 80px;
  background-color: red;
  margin: 10px;
  border-radius: 50%;
`;

export const Text = styled(motion.div)`
  font-size: 20px;
  color: white;
`;
