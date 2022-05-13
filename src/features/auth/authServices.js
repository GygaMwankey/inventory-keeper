import axios from "axios"

const url = "http://127.0.0.1:8000/api/auth/";

const LOADUSER_URL = `${url}user/`
const REGISTER_URL = `${url}register/`;
const LOGIN_URL = `${url}login/`;
const LOGOUT_URL = `${url}logout/`;

// Load User
const loadUser = async (token) => {

    const  config = {
        headers: {
            "Content-Type" : "application/json"
        }
    }

    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }

    const res = await axios.get(LOADUSER_URL, config)
    return res.data
}

// Register User
const register = async (userData) => {
    const  config = {
        headers: {
            "Content-Type" : "application/json"
        }
    }

    const res = await axios.post(REGISTER_URL, userData, config)
    return res.data;
};

// Login User

const login = async  (userData) => {
    const  config = {
        headers: {
            "Content-Type" : "application/json"
        }
    }

    const res = await axios.post(LOGIN_URL, userData, config)
    return res.data
};

// Logout User

const logout = async (token) => {
    const config = {
        headers: {
            "Content-Type" : "application/json"
        }
    };
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }
    await axios.post(LOGOUT_URL, '', config);

}

const  authServices = {
    loadUser,
    register,
    login,
    logout
}

export default  authServices;