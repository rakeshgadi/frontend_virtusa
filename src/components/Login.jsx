import React,{useState} from 'react';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from "react-router-dom";

import {Link} from "react-router-dom"

const Login = () => {
    const paperStyle = { padding: 50, height: '65vh', width: 300, margin: "20 auto" }
    const avtarStyle = { background: 'blue' }
    const btnStyle = { margin: "20px 0" }
    const history = useHistory()


    const url=""
    const [data, setData]=useState({
        email:"",
        password:"",
    })
    const [isUserValid, setUserValid] = useState([false])

    function submit(e){
        e.preventDefault();
        fetch(url,
            {
                method: "POST",
                body: {
                    email: data.email,
                    password: data.password,
                }
            }).then(res => {
                console.log(res.json());
                setUserValid(res);
                {/*if (isUserValid) {
                    history.push("/home")
                }*/}
            })
            .catch((error) => {
                console.log(error)
            });
    }

    function handle(e){
        const newdata={...data}
        if(!e || !e.target || !e.target.value){
            return false;
        }
        newdata[e.target.id]=e.target.value
        setData(newdata)
        console.log(newdata)
    }

    return (
        <Grid align='center' >
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avtarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>LOGIN</h2>
                </Grid>
                <form onSubmit={(e)=>submit(e)} id='loginBox'>
                <TextField  onChange={(e)=>handle(e)} value={data.email} type='email' id='email' label='Email' placeholder="Enter Email Id" fullWidth required></TextField>
                <TextField  onChange={(e)=>handle(e)} value={data.password} id='password' type='password' label='Password' placeholder="Enter Password" fullWidth required></TextField>
                <Button id='submitButton' type='submit' color='primary' variant='contained' style={btnStyle} fullWidth>LOGIN</Button>
                </form>
                <Typography>
                    New to Bookstore?
                    <Link id='signupLink' to='/signup'>
                        Register
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login;