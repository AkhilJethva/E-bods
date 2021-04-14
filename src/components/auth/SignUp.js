import React , {useState} from 'react'
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './SignUp.css'
import { connect } from "react-redux";
import {signUp} from '../../store/actions/authAction'
import { Redirect } from 'react-router-dom';
import Lottie from 'react-lottie';
import A1 from '../../animations/21372-launch-yourself.json'

function SignUp(props) {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: A1,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    
    
    const handleSignup = (event) => {
        event.preventDefault();
        props.signUp({email,password,fname,lname})
        setemail("")
        setpassword("")
        setlname("")
        setfname("")
    }

    const {authError,auth} = props;
    if(auth.uid) return <Redirect  to="/home"/>
    return (
        <div className="signup">
            <div className="signUp__anim" ><Lottie 
                    options={defaultOptions}
                    height={250}
                    width={250}
                /></div>
            <div className="signup__body">
                <h3>Sign Up Here</h3><br></br>
                <Form onSubmit={handleSignup} >
                    <FormGroup>
                        <Label for="fname">First Name</Label>
                        <Input type="fname" name="fname" id="fname" placeholder="First Name" 
                            value={fname} 
                            onChange={e => setfname(e.target.value)}
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lname">Last Name</Label>
                        <Input type="lname" name="lname" id="lname" placeholder="Last Name"
                            value={lname} 
                            onChange={e => setlname(e.target.value)}
                            required
                            />
                    </FormGroup>
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
                    <Button className="signup__btn" disabled={email? password ? false:true : true}>Submit</Button>
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
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp)
