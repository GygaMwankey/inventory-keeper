import './App.css';

import React, {Fragment, useEffect} from 'react';
import ItemList from "./components/stock/ItemList";
import Header from "./components/layout/Header";

import { HashRouter as Router, Route, Routes} from "react-router-dom";
import Box from "@mui/material/Box";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import {useDispatch, useSelector} from "react-redux";
import { loadUser } from "./features/auth/authSlice";
import PrivateRoute from "./components/layout/PrivateRoute";

function App() {

  const auth = useSelector(state => state.auth);
  const  dispatch = useDispatch();

  useEffect(() => {
    const token = auth.token;

    dispatch(loadUser(token))
  }, [dispatch, auth.token]);

  return (
      <Router>
        <Fragment>
          <Header />
          <Box sx={{marginTop:10}}>
            <Routes>
              <Route
                  path="/"
                  element={
                    <PrivateRoute auth={auth}>
                      <ItemList />
                    </PrivateRoute>
                  }
              />
              <Route
                  path="/login"
                  element={
                    <Login />
                  }
              />
              <Route
                  path="/register"
                  element={
                    <Register />
                  }
              />
            </Routes>
          </Box>
        </Fragment>
      </Router>
  );
}

export default App;
