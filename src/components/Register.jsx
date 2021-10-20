import React, { useState } from 'react'
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Formik,Field,Form ,ErrorMessage} from 'formik';
import * as Yup from 'yup';


const Register = () => {
    const paperStyle = { padding: 50, height: '70vh', width: 300, margin: "20 auto" }
    const avtarStyle = { backgroundColor: 'blue' }
    const btnStyle = { margin: '20px 0' }
    const history = useHistory()

    const url = ""
    const [userDetails, setUserDetails] = useState({
        email: "",
        username: "",
        mobilenumber: "",
        password: "",
        confirmpassword: ""
    })
    const [isUserExist, setUserExist] = useState([false])

    const validationSchema = Yup.object().shape({
        mobilenumber: Yup.number().typeError("Enter valid Phone Number").required('Required'),
        password: Yup.string()
          .required('New Password is required'),
        confirmpassword: Yup.string()
          .required('Confirm Password is required')
          .oneOf([Yup.ref('password'), null], 'Passwords does not match'),
      });

    function submit(e) {
        e.preventDefault();
        fetch(url,
            {
                method: "POST",
                body: {
                    email: userDetails.email,
                    username: userDetails.username,
                    mobilenumber: userDetails.mobilenumber,
                    password: userDetails.password,
                }
            }).then(res => {
                setUserExist(res);
                if (isUserExist) {
                    history.push("/login")
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    function handle(e) {
        const newdata = { ...userDetails }
        newdata[e.target.id] = e.target.value
        setUserDetails(newdata)
    }


    return (
        <Grid align='center'>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avtarStyle}>
                    </Avatar>
                    <h2>REGISTER</h2>
                </Grid>
                <Formik onSubmit={(e) => submit(e)} validationSchema={validationSchema} id='signupBox'>
                    {(props)=>(
                        <Form>
                    <Field as={TextField} onChange={(e) => handle(e)} value={userDetails.email} type='email' id='email' name="email" label='Email' placeholder='Enter Email Id' helperText={<ErrorMessage name="email"/>} fullWidth  required />
                    <Field as={TextField} onChange={(e) => handle(e)} value={userDetails.username} id='username' name="username" label='UserName' placeholder='Enter UserNAme' helperText={<ErrorMessage name="username"/>} fullWidth required />

                    <Field as={TextField} onChange={(e) => handle(e)} value={userDetails.mobilenumber} id='mobilenumber' inputProps={{ maxLength: 10 } } name="mobilenumber" label='Mobile No.' placeholder='Enter Mobile No.' helperText={<ErrorMessage name="mobilenumber"/>} fullWidth />
                    <Field as={TextField} onChange={(e) => handle(e)} value={userDetails.password} id='password' type='password' name="password" label='Password' placeholder='Enter Password' helperText={<ErrorMessage name="password"/>} fullWidth />
                    <Field as={TextField} onChange={(e) => handle(e)} value={userDetails.confirmpassword} id='confirmpassword' type='password' name="confirmpassword" label='Confirm Password' placeholder='Confirm Password' helperText={<ErrorMessage name="confirmpassword"/>} fullWidth />
                    <Button id='submitButton' type='submit' color='primary' variant='contained' style={btnStyle} fullWidth>REGISTER</Button>
                    </Form>
                    )}
                    </Formik>
                <Typography>
                    Already a member?
                    <Link id='signinLink' to='/login'>
                        LOGIN
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Register;