import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import queryString from "query-string";
import { Link, Navigate} from "react-router-dom";
import Cookies from "js-cookie";
import { Alert } from "react-bootstrap";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId,setUserId]=useState(Cookies.get('userId'));
  const [isInvalid,setIsInvalid]=useState(false);

  useEffect(()=>{
    setUserId(Cookies.get('userId'))
  },[]);


  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    await fetch(process.env.REACT_APP_BACKEND_URL+'login', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({username:email,
                                         password:password})
            })
            .then((response) => {
              if(!response.ok){
                setIsInvalid(true);
              }
              return response.json()})
            .then((data) => {
                setUserId(data.id);
                Cookies.set('userId',data.id);
                Cookies.set('userName' , data.name);
            })
            .catch((err) => {
                console.log(err);
        });
      window.location.reload();
  }

  return (
      userId ? <Navigate to="/" /> :
      <div className="Login">
      {isInvalid ? 
            <Alert style={{'textAlign':'center',
                            'margin':'10px auto auto auto',
                            'width':'30%'}} key={'danger'} variant={'danger'}>
                User Name or Password is Invalid.
            </Alert>: null}
      <Form onSubmit={handleSubmit}>
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
          Log In
        </Button>

        <Button style={{ margin: "10px 0 0 10px" }} variant="secondary">
            <Link to="/register" style={{textDecoration: 'none', color: "white"}}>Register</Link>
        </Button>
      </Form>
    </div>
  );
}
