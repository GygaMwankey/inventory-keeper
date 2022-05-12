import React, {useEffect, useState} from 'react';
import Item from "./Item";
import {useSelector, useDispatch} from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddOutlined from "@mui/icons-material/AddOutlined";
import KeyboardArrowUpOutlined from "@mui/icons-material/KeyboardArrowUpOutlined";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button";
import { getStockItems } from ".//stockSlice";
import CardActions from "@mui/material/CardActions";
import AddItem from "./AddItem";



const ItemList = () => {

    const { stockItems, isLoading } = useSelector((state) => state.stock);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getStockItems());
    },[]);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    if (isLoading){
        return (
            <div>
                <h2>Loading ...</h2>
            </div>
        )
    }
    else if (stockItems.length <1){
        return (
            <div className="container">
                <h2>Your stock is empty</h2>
                <Card sx={{ marginTop: 0 }} elevation={7}>
                    <CardHeader
                        sx={{ marginBottom : -1, marginTop: -1 }}
                        title={`Items in your store : ${stockItems.length}`}
                        action={
                            <IconButton
                                arial-label="close"
                                onClick={handleOpen}
                            >
                                {!open ? <AddOutlined sx={{color: "blue"}} /> : <KeyboardArrowUpOutlined />}
                            </IconButton>
                        }
                    />
                </Card>
                { open ?
                    <AddItem />
                    : ""
                }
            </div>
        )
    }
    return (
        <div className="container">
            <h2>Your Stock</h2>
            <Grid container spacing={2}>
                    {stockItems.map((item) => {
                        return (
                            <Grid item xs={6} key={item.id} >
                                <Item key={item.id} {...item}/>
                             </Grid>
                        )
                    })}
            </Grid>
            <hr/>
            <Card sx={{ marginTop: -2 }} elevation={7}>
                <CardHeader
                    sx={{ marginBottom : -1, marginTop: -1 }}
                    title={`Items in your store : ${stockItems.length}`}
                    action={
                        <IconButton
                            arial-label="close"
                            onClick={handleOpen}
                        >
                            {!open ? <AddOutlined sx={{color: "blue"}} /> : <KeyboardArrowUpOutlined />}
                        </IconButton>
                    }
                />
            </Card>
            { open ?
                <AddItem />
                : ""
            }
        </div>

    );
};

export default ItemList;
