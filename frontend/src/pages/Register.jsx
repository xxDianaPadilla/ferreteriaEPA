import React from "react";
import RegisterForm from "../components/RegisterForm";

const Register = ({ onSwitchToLogin, onRegisterSuccess }) => {
    return (
        <>
            <RegisterForm 
                onSwitchToLogin={onSwitchToLogin}
                onRegisterSuccess={onRegisterSuccess}
            />
        </>
    );
};

export default Register;