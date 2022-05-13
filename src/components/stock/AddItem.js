import React, {useState} from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions/CardActions";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {addStockItem} from "../../features/stock/stockSlice";
import {toast} from "react-toastify";

const AddItem = () => {

    const dispatch = useDispatch();

    const [ name,setName ] = useState('');
    const [ description,setDescription ] = useState('');
    const [ amount,setAmount ] = useState('');


    const handleAddStockItem = (e) => {
        e.preventDefault()
        if (amount < 0 ) {
            toast("Amount should be 0 or above")
        }
        else{
            const stockItem ={
                name,
                description,
                amount : Math.ceil(Number(amount))
            };
            dispatch(addStockItem(stockItem));
            setName('');
            setDescription('');
            setAmount('');
        }
    };


    return (

        <Card sx={{ marginTop: 2 }} elevation={7}>
                <CardHeader
                    sx={{ marginBottom : -1, marginTop: -1 }}
                    title={`Add Item in Stock`}
                />
                <CardActions>
                    <form onSubmit={handleAddStockItem} className="form form-inline form-group">
                    <TextField
                        id='item-name'
                        label="Name"
                        type="text"
                        variant="standard"
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={true}
                    />
                    <TextField
                        id='item-description'
                        label="Description"
                        type="text"
                        variant="standard"
                        size="small"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required={true}
                    />
                    <TextField
                        id='item-amount'
                        label="Amount"
                        type="number"
                        variant="standard"
                        size="small"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required={true}
                    />
                    <Button
                        size="large"
                        type="submit"
                    >
                        add
                    </Button>
                    </form>
                </CardActions>
        </Card>
    );
};

export default AddItem;
