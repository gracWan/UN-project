import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [errorMessages, setErrorMessages] = useState([]);

    const toggleForm = () => setIsRegistering(!isRegistering);

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Add login validation and submission logic here
        console.log('Login data submitted:', loginData);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        // Add registration validation and submission logic here
        console.log('Register data submitted:', registerData);
    };

    return (
        <div className="section">
            <div className="container">
                <div className="full-height center-content">
                    <div className="text-center">
                        <div className="form-switch-container text-center">
                            <h6 className="switch-tabs">
                                <p className="form-switch" onClick={() => setIsRegistering(false)}>Login</p>
                                <p className="form-switch" onClick={() => setIsRegistering(true)}>Register</p>
                            </h6>
                            <input
                                className="checkbox"
                                type="checkbox"
                                id="reg-log"
                                checked={isRegistering}
                                onChange={toggleForm}
                            />
                            <label htmlFor="reg-log"></label>
                            {errorMessages.map((msg, index) => (
                                <div key={index} className="error-message">
                                    {msg}
                                </div>
                            ))}
                            <div className="card-3d-wrap">
                                <div className="card-3d-wrapper">
                                    {!isRegistering ? (
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                <h4 className="title" style={{marginBottom: '8px'}}>Login</h4>
                                                    <form onSubmit={handleLoginSubmit} className="form-group">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            placeholder="Email"
                                                            className="form-style"
                                                            value={loginData.email}
                                                            onChange={handleLoginChange}
                                                            required
                                                        />
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            placeholder="Password"
                                                            className="form-style"
                                                            value={loginData.password}
                                                            onChange={handleLoginChange}
                                                            required
                                                        />
                                                        <button className="btn" type="submit">
                                                            Submit
                                                        </button>
                                                    </form>
                                                    <p className="text-center">
                                                        <a href="#0" className="link">
                                                            Forgot your password?
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="title" style={{marginBottom: '8px'}}>Register</h4>
                                                    <form onSubmit={handleRegisterSubmit} className="form-group">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            placeholder="Name"
                                                            className="form-style"
                                                            value={registerData.name}
                                                            onChange={handleRegisterChange}
                                                            required
                                                        />
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            placeholder="Email"
                                                            className="form-style"
                                                            value={registerData.email}
                                                            onChange={handleRegisterChange}
                                                            required
                                                        />
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            placeholder="Password"
                                                            className="form-style"
                                                            value={registerData.password}
                                                            onChange={handleRegisterChange}
                                                            required
                                                        />
                                                        <input
                                                            type="password"
                                                            name="confirmPassword"
                                                            placeholder="Confirm Password"
                                                            className="form-style"
                                                            value={registerData.confirmPassword}
                                                            onChange={handleRegisterChange}
                                                            required
                                                        />
                                                        <button className="btn" type="submit">
                                                            Submit
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;