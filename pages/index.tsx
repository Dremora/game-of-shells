import React from "react";
import Head from "next/head";

import styled, { createGlobalStyle } from "styled-components";

import GameField from "../src/GameField";

const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
    margin: 0;
    padding: 0;
    background: black;
    font-family: 'Press Start 2P', cursive;
    user-select: none;
  }

  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #__next {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
}
`;

const Home = () => (
  <>
    <GlobalStyles />
    <Head>
      <title>Game of Shells</title>
      <link
        href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />
    </Head>
    <GameField />
  </>
);

export default Home;
