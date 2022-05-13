import React, {useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../features/auth/authSlice";
import {toast} from "react-toastify";


const Register = () => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');


    const handleRegister = (e) => {
        e.preventDefault();

        if (password1!==password2){
            toast.error("Password do not match")
        }
        else{
            const body = JSON.stringify(
                {
                    username: username,
                    email: email,
                    password: password1
                });
            dispatch(registerUser(body));
        }
    };

    if(!auth.isAuthenticated)
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">
                        Register
                    </h2>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <TextField
                                type="email"
                                name="email"
                                value={email}
                                className="form-control"
                                label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your Email"
                                required={true}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                type="text"
                                name="username"
                                value={username}
                                className="form-control"
                                label="Username"
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your Username"
                                required={true}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                type="password"
                                name="password1"
                                value={password1}
                                className="form-control"
                                label="Password"
                                onChange={(e) => setPassword1(e.target.value)}
                                placeholder="Enter your Username"
                                required={true}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                type="password"
                                name="password2"
                                value={password2}
                                className="form-control"
                                label="Confirm Password"
                                onChange={(e) => setPassword2(e.target.value)}
                                placeholder="Please re-type your Password"
                                required={true}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <p>
                            Already have an account? <Link to="/login" className="register" style={{color: 'blue', }}>Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    return <Navigate to="/"/>
};

export default Register;
