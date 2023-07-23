import React from 'react'
import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from "../Data/authSlice";

const Login = () => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [requestMessage, setRequestMessage] = useState("");
  const [requestStatus,setRequestStatus] = useState(0);


  const dispatch = useDispatch();


  const login = async(event:any)=>{
    event?.preventDefault()
    const url = "http://localhost:8080/api/v1/auth/login"
    try {
      const loginRequestBody = {
        email: email,
        password: password,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequestBody),
      });

      if (!response.ok) {
        throw new Error("Network request was not ok!");
      }
      const responseData = await response.json();
      if (responseData.status !== 200) {
          setRequestMessage(responseData.message);
          setRequestStatus(responseData.status)
      }else{
        setRequestStatus(responseData.status);
        setRequestMessage("Logged in successfully");
        dispatch(loginSuccess({user:responseData.user}))
        console.log(responseData);
        setTimeout(function () {
          window.location.href = "/";
        }, 2000);
      }

    } catch (error: any) {
      setRequestStatus(0);
      setRequestMessage("Error occurred during registration");

    }
  }
  const togglePasswordVisibility = () => {
    const passwordInput: any = document.getElementById("user-password");
    const eyeVisibleIcon: any = document.getElementById("eye-visible");
    const eyeUnvisibleIcon: any = document.getElementById("eye-unvisible");
    
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeVisibleIcon.style.display = "none";
      eyeUnvisibleIcon.style.display = "block";
    } else {
      passwordInput.type = "password";
      eyeVisibleIcon.style.display = "block";
      eyeUnvisibleIcon.style.display = "none";
    }
  };
  return (
    <div className="login-form">
    <h2 className=" py-4">Login</h2>
    {requestStatus === 200 ? (
      <>
          <div className="loading-bar"></div>
      <p className="success-message">{requestMessage}</p></>
    ) : (
      <p className="error-message my-2">{requestMessage}</p>
    )}

    <form onSubmit={login}>
      <input
        onChange={(e)=>setEmail(e.target.value)}
        name="user-email"
        placeholder="Email"
        type="email"
      />
      <div className="password-container">
        <input
        onChange={(e)=>setPassword(e.target.value)}
          type="password"
          name="user-password"
          id="user-password"
          placeholder="Password"
        />
        <svg
          onClick={togglePasswordVisibility}
          id="eye-visible"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-eye"
          viewBox="0 0 16 16"
        >
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
        </svg>
        <svg
          onClick={togglePasswordVisibility}
          id="eye-unvisible"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-eye-slash"
          viewBox="0 0 16 16"
        >
          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
          <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
          <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
        </svg>
      </div>
      <div className="button-box">
        <button type="submit" className="order-button-payment">
          Login
        </button>
      </div>
    </form>
  </div>
  )
}

export default Login