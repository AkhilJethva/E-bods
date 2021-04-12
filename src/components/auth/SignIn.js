import React,{useState} from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './SignIn.css'
import {connect} from 'react-redux'
import { signIn } from '../../store/actions/authAction'
import { Redirect } from 'react-router-dom';

import firebase from '../../config/fbconfig'



function SignIn(props) {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  
  
  const handleLogin = (event) => {
      event.preventDefault();
      props.signIn({email,password});
      setemail("")
      setpassword("")
      
      
  }
  const {authError,auth} = props
  if(auth.uid){
    console.log("kuch to huva")
    
  }
  
  
  console.log("hello I am auth",auth.email)

  if(auth.uid) return <Redirect  to="/home"/>

  return (
    <div className="signin">
      <div className="signin__body">
        <h3>LogIn Here</h3><br></br>
        <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleEmail" 
                value={email}
                placeholder="xyz@abc.com" 
                onChange={e => setemail(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="password" id="examplePassword"
                placeholder="password must contain 8 characters" 
                value={password}
                onChange={e => setpassword(e.target.value)}
                />
            </FormGroup>
            <Button className="signin__btn" disabled={email? password ? false:true : true}>Submit</Button>
            <div>
                {authError ? <p>{authError}</p> : null}
            </div>          
          </Form>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    authError : state.auth.authError,
    auth : state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)
