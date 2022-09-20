import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

const ButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

function Logout(props) {
  const navigate = useNavigate();
  const handleClickLogout = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <ButtonStyled onClick={handleClickLogout}>
      <BiPowerOff />
    </ButtonStyled>
  );
}

export default Logout;
