import React from 'react';
import {Link} from "react-router-dom";

const Register = () => {
    return (
        <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <h2 className="text-center">
                    Register
                </h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username: </label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Confirm Password: </label>
                        <input
                            type="password"
                            name="password2"
                            className="form-control"
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
};

export default Register;
