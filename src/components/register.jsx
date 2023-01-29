import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import queryString from "query-string";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Alert } from "react-bootstrap";

export default function Register() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName] = useState("");
  const [userId,setUserId] = useState(Cookies.get('userId'));
  const [message,setMessage] = useState(null);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  useEffect(()=>{
    setUserId(Cookies.get('userId'))
  },[]);

  const  handleSubmit = async(event) => {
    event.preventDefault()
    await fetch(process.env.REACT_APP_BACKEND_URL+'register', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: queryString.stringify({name:name,
                                      username:email,
                                      password:password})
        })
        .then((response) => {
          if(response.status===406){
            setMessage("A user with the given username is already registered");
          }else if(!response.ok){
            setMessage("A somthing went wrong");
          }
          return response.json();
        })
        .then((data) => {
            Cookies.set('userId',data.id);
            Cookies.set('userName',data.name);
            setUserId(data.id)
        })
        .catch((err) => {
            console.log(err);
      });
      window.location.reload();
  }

  return (
    userId ? <Navigate to="/login" /> : 
    <div className="Login">
    {message ? <Alert style={{'textAlign':'center',
                            'margin':'10px auto auto auto',
                            'width':'30%'}} key={'danger'} variant={'danger'}>
                {message}
            </Alert>: null}
    <Form onSubmit={handleSubmit}>
      <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>

          <Form.Control
            autoFocus
            type=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>

          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          type="submit"
          disabled={!validateForm()}
          style={{ marginTop: "10px", color: "white" }}
        >
          Register
        </Button>
      </Form>
    </div>
  );
}