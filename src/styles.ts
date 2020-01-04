import styled from "styled-components";

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

export const Container = styled.button`
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
  box-shadow: 0px 0px 0px 0 rgba(255, 255, 255, 0.75);
`;

export const BottomText = styled.div`
  font-size: 20px;
  color: white;
`;
