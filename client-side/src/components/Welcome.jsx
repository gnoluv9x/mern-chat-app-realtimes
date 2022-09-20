import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

const WelcomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
`;

function Welcome({ currentUser }) {
  return (
    <WelcomeContainer>
      <img src={Robot} alt="robot" />
      <h1>
        Welcome, <span>{currentUser?.username}</span> !
      </h1>
      <h3>Please select a chat to Start Messaging</h3>
    </WelcomeContainer>
  );
}

export default Welcome;
