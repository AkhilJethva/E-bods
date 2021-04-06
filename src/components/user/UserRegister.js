import React, {Component} from 'react'
import { Button, Form, FormGroup, Label, Input,Spinner, Alert} from 'reactstrap';
import './UserRegister.css'
import web3 from '../../ethereum/web3'
import admin from '../../ethereum/admin';
import donationSystem from '../../ethereum/donationSystem'
// import firebase from '../../config/fbconfig'
import { Link } from 'react-router-dom';

    
class UserRegister extends Component{
    constructor(props) {
        super(props);
        this.state = {email:"", aadhar:"",fullname:"",mobile:"",spin: false,errMsg:"",result:false};
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    async componentDidMount(){
        await window.ethereum.enable()
        try{
            const accounts = await web3.eth.getAccounts();
            const admins = await admin.methods.getAdmins().call({ from : accounts[0]});
            const users = await donationSystem.methods.getDeployedUsers().call({from: accounts[0]})
            console.log("Hello",users)
            
        }
        catch(e){
            console.log(e)
        }
        
    }

    async handleSubmit(e){
        e.preventDefault();
        this.setState({errMsg:""})
        this.setState({spin: true})
        await window.ethereum.enable()
        try{
            const accounts = await web3.eth.getAccounts();
            console.log("sdfd",this.state)
            await donationSystem.methods.createUserContact(this.state.fullname,this.state.email,this.state.aadhar,this.state.mobile).send({ from : accounts[0]});
            const add = await donationSystem.methods.getUserContractAddress(this.state.email).call ({ from : accounts[0]});
            console.log("my",add)
            this.setState({result:true})
        }
        catch(e){
            this.setState({errMsg:e.message})
        }
        this.setState({spin: false})
        
    }

    render() {
        // console.log(this.state.adminInput)
        return (
            <div className="userRegister">
            <div className="userRegister__body">
                <h3>Register Your Self here :: </h3><br></br>
                <Form onSubmit={this.handleSubmit} >
                    <FormGroup>
                        <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Your Name as on Addhar" 
                            value={this.state.fullname} 
                            onChange={e => this.setState({fullname:e.target.value})}
                            required
                            />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail"
                            value={this.state.email}
                            placeholder="xyz@abc.com" 
                            onChange={e => this.setState({email: e.target.value})}
                            required
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label for="aadhar">Aadhar No.</Label>
                        <Input type="text" name="aadhar" id="aadhar" placeholder="Your Aadhar no"
                            value={this.state.aadhar} 
                            onChange={e => this.setState({aadhar: e.target.value})}
                            required
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label for="mobile">Mobile No.</Label>
                        <Input type="mobile" name="mobile" id="mobile"
                            placeholder="Your Mobile No." 
                            value={this.state.mobile}
                            onChange={e => this.setState({mobile :e.target.value})}
                            required
                            />
                    </FormGroup>
                    {/* <FormGroup>
                        <Label for="documents">Documents</Label>
                        <CustomInput type="file"

                            onChange={ handleDocChange}
                            id="exampleCustomFileBrowser" name="customFile"  />
                        <FormText color="muted">
                            This is some placeholder block-level help text for the above input.
                            It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox" id="checkbox2" />{' '}
                        Check me out
                        </Label>
                    </FormGroup> */}

                    {
                        !this.state.spin ?
                            <Button className="userRegister__btn" >Submit</Button>: 
                            <Spinner color="primary" />
                    }
                    
                    <div style={{marginTop: "10px"}}>
                        {this.state.errMsg ? 
                            <Alert color="danger">
                                {this.state.errMsg.substr(0,50)}
                            </Alert> : null
                        }
                    </div> 
                    <div style={{marginTop: "10px"}}>
                        {this.state.result ? 
                            <Alert color="success">
                                You Have succesfully registered! <Link to="/userlogin"> Click Here to Continue</Link>
                            </Alert> : null
                        }
                    </div> 
                </Form>

                <div className="userRegister__bottomLine">Already Have an Acoount? <Link to="/userlogin">click here</Link> </div>
            </div>
        </div>
        )
    }
}
export default UserRegister