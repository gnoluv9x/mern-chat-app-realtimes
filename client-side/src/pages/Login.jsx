import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/ApiRoutes";

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  background-color: #131324;

  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 5rem;
      filter: brightness(2.8);
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }

    span {
      color: white;
      text-transform: uppercase;
      text-align: center;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

function Login(props) {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const isAuth = localStorage.getItem("chat-app-user");
    if (isAuth) navigate("/");
  }, [navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { username, password } = formValues;
      if (handleValidation()) {
        const { data } = await axios.post(loginRoute, { username, password });
        if (!data.status) {
          toast.error(data.msg, toastOptions);
        } else {
          toast.success(data.msg, toastOptions);
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/");
        }
      }
    } catch (error) {
      console.log("error :", error);
      toast.error(error.message, toastOptions);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleValidation = () => {
    const { password, username } = formValues;
    if (username.length <= 3) {
      toast.error("Username is required and it must be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length <= 8) {
      toast.error("Username is required and it must be greater than 8 characters", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="brand logo" />
          </div>
          <input
            autoComplete="off"
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleInputChange}
            min={3}
          />
          <input
            autoComplete="off"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
            min={8}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

export default Login;
