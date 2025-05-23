import React from "react";
import LoginForm from "../components/LoginForm";

const Login = ({onSwitchToRegister, onLoginSuccess}) => {
    return (
        <>
            <LoginForm onSwitchToRegister={onSwitchToRegister} 
          onLoginSuccess={onLoginSuccess} />
        </>
    );
};

export default Login;