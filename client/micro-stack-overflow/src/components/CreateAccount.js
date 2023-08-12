import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

// import Error from "./Error";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const auth = useContext(AuthContext)

  // const validatePassword = (password)=> {
  //   return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(password);
  // }

  const handleSubmit = async (event) => {
      event.preventDefault();
      
      // if(!validatePassword(password)) {
      //   const invalidPasswordMessage = ["Password must be between 8-20 characters, include a special character, a number, and a capital letter."]
      //   setErrors(invalidPasswordMessage);
      // }

      const response = await fetch("http://localhost:8080/create_account", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              username,
              password,
          }),
      });
  
      // This code executes if the request is successful
      if (response.status === 201) {
          navigate("/");
      } else if (response.status === 403) {
          setErrors(["Account Creation failed."]);
      } else {
          const errorMessages = await response.json();
          // const errorMessageFull = errorMessage[0]
          console.log(errorMessages[0]);

          setErrors(errorMessages);
      }
  };

  return (
    <div>
      <h2>CREATE ACCOUNT</h2>
      {errors.map((error, i) => (
        <div key={i}>{error}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <div>
          {/* Includes for/id attributes for basic HTML accessibility ♿. */}
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            id="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            id="password"
          />
        </div>
        <div>
          <button type="submit">Create Account</button>
        </div>
      </form>
    </div>
  );
}