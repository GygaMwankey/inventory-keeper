import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../features/auth/authSlice";
import {Navigate} from "react-router";

const Login = () => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = (e) => {

        const body = JSON.stringify(
            {
                username: username,
                password: password
            });
        dispatch(loginUser(body));

    };


    if(!auth.isAuthenticated)
        return (
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-5">
                        <h2 className="text-center">
                            Login
                        </h2>
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="username">Username: </label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password: </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Login
                                </button>
                            </div>
                            <p>
                                Don't have an account? <Link to="/register" className="register" style={{color: 'blue', }}>Register</Link>
                            </p>
                        </form>
                    </div>
                </div>
        );
    return <Navigate to="/"/>
};

export default Login;
