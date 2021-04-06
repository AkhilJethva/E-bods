import React, {useState} from 'react'
import { Link,Redirect } from 'react-router-dom'
import { Form, FormGroup, Input, Label,Button, Alert } from 'reactstrap'
import donationSystem from '../../ethereum/donationSystem'
import web3 from '../../ethereum/web3'
import {connect} from 'react-redux'
import './UserLogin.css'

function UserLogin(props) {
    const [email, setemail] = useState("")
    const [userAdd, setuserAdd] = useState("")
    const [error, seterror] = useState("")

    
    console.log(props.auth.email)
    const handleSubmit = async(e) => {
        e.preventDefault();
        seterror("")
        await window.ethereum.enable()
        try{
            if(email != props.auth.email){
                throw "Please Enter the Same Email That you Registered With"
            }
            const accounts = await web3.eth.getAccounts();
            const add = await donationSystem.methods.getUserContractAddress(email).call ({ from : accounts[0]});
            console.log("Result",add)
            
            setuserAdd(add)
            
            
        }
        catch(e){
            console.log(e)
            seterror(e)
        }
        setemail("")
    }

    console.log("Come On",userAdd )
    if(userAdd){
        if(userAdd !== '0x0000000000000000000000000000000000000000')
        return(
            <Redirect  to={`/userhome/${userAdd}`} />
        )
    }    
    return(
        <div className="userLogin">
                <div className="userLogin__left">
                    
                    <Form className="userLogin__leftForm"  >
                        <div className="userlogin__head"> 
                            <p><h3>Welcome!</h3><br></br>
                            <h3>Enter to the Ethereum world Here</h3></p>
                            <img src="https://img.icons8.com/color/144/000000/woody-woodpecker.png"/>
                        </div>
                            <FormGroup>
                                <Label for="email"><h5>Email :</h5></Label>
                                    <Input type="email" name="email" id="email" placeholder="Your Email That You Registered with" 
                                    value={email}
                                    onChange={event => {setemail(event.target.value)}}
                                    required
                                    />
                            </FormGroup>
                            {
                                error ? 
                                <Alert color="danger">{error}</Alert> : null
                            }
                            <Button onClick={handleSubmit} className="userLogin__leftbtn" color="primary" >Login</Button>
                    </Form>
                </div>
                <div className="userLogin__line"></div>
                <div className="userLogin__right">
                    <img className="userLogin__rightImg" src="https://img.icons8.com/color/144/000000/optin-monster.png"/>
                    <h3>Hola! Welcome to E-BODs family.</h3>
                    <h4>Are you new Here? Don't worry we got you back.🤩</h4>
                    <Link to="/userRegister"><Button className="userLogin__rightbtn"  color="success">Click Me</Button></Link> 
                    
                </div>
            </div>
    )
}


const mapStateToProps = (state) => {
    return{
        auth : state.firebase.auth
    }
}

export default connect(mapStateToProps)(UserLogin)
