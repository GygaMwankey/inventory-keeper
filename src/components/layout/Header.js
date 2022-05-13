import React from 'react';


import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../features/auth/authSlice";


const Header = () => {

    const auth = useSelector(state => state.auth);
    console.log(auth);
    const  dispatch = useDispatch();

    const  handleLogout = (token) => {
        token = auth.token;
        dispatch(logoutUser(token));
    };

    return (
        <div className="container">
            <CssBaseline />
            <MuiAppBar elevation={7}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div"
                                sx={{marginLeft: 1,}}>
                        <Link to="/">Inventory Keeper</Link>
                    </Typography>

                    <div className="navbar-nav ml-auto">
                        {auth.isAuthenticated ?
                            <ul className="nav nav-item" style={{ alignItems: "center"}}>
                                <li className="nav-item mr-4" style={{fontSize: 13}}>Welcome {auth.user.username} {auth.user.is_staff ?'( Manager )': '( Staff )'}</li>
                                <li className="nav-item mr-3">
                                    <button className="btn btn-sm btn-outline-light" onClick={handleLogout}> Logout </button>
                                </li>
                            </ul>
                            :
                            <ul className="nav nav-item">
                                <li className="nav-link mr-3">
                                    <Link to='/login' >Login</Link>
                                </li>
                                <li className="nav-link mr-3">
                                    <Link to="/register"> Register </Link>
                                </li>
                            </ul>
                        }
                    </div>
                </Toolbar>
            </MuiAppBar>
        </div>
    );
};

export default Header;
