import React, {useState} from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useDispatch} from "react-redux";
import {
    updateAmount,
    removeFromStock,
    deleteStockItem,
    updateStockItem
} from ".//stockSlice";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";

const Item = (item) => {

    const dispatch = useDispatch();

    const [itemAmount,setItemAmount] = useState("");

    const handleAddStock = (e) => {
        e.preventDefault();
        const amount = Number(item.amount) + Math.abs(Number(itemAmount));
        const itemId = item.id;
        const stockItem ={
            id : item.id,
            name : item.name,
            description : item.description,
            amount
        };
        dispatch(updateAmount({amount,itemId}));
        dispatch(updateStockItem(stockItem));
        setItemAmount('');
    };

    const handleRemoveStock = (e) => {
        if (Number(item.amount) >= Math.abs(Number(itemAmount))){
            e.preventDefault();
            const amount = Number(item.amount) - Math.abs(Number(itemAmount));
            const itemId = item.id;
            const stockItem ={
                id : item.id,
                name : item.name,
                description : item.description,
                amount
            };
            dispatch(updateAmount({amount,itemId}));
            dispatch(updateStockItem(stockItem));
            setItemAmount('');
        }
        e.preventDefault();
        setItemAmount('');
    };

    const handleDeleteItem = () => {
        const itemId = item.id;
        dispatch(removeFromStock(itemId));
        dispatch(deleteStockItem(itemId));
    };

    return (
        <Card>
            <CardHeader
                title={item.name}
                subheader={"Available stock " + item.amount}
                sx={{marginBottom: -3}}
                action={
                    <IconButton
                        arial-label="close"
                        onClick={handleDeleteItem}
                    >
                        <Close sx={{color: "red"}} />
                    </IconButton>
                }
            />
            <CardContent>
                <Typography>{item.description}</Typography>

            </CardContent>
            <CardActions>
                <form className="form form-inline form-group">
                <TextField
                    id='item-amount'
                    label="Amount"
                    type="number"
                    variant="standard"
                    size="small"
                    value={itemAmount}
                    onChange={(e) => setItemAmount(e.target.value)}
                    required={true}
                />
                <Button
                    size="small"
                    type="submit"
                    onClick={handleAddStock}
                >
                    ADD
                </Button>
                <Button
                    size="small"
                    type="submit"
                    onClick={handleRemoveStock}
                >
                    REMOVE
                </Button>
                </form>
            </CardActions>
        </Card>
    );
};

export default Item;
