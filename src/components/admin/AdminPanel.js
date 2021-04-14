import React, { Component } from 'react'
import { Container, Form, FormGroup, Input,Button,Col, Spinner, Label, Row,  Alert } from 'reactstrap';
import admin from '../../ethereum/admin';
import approver from '../../ethereum/approvers';
import web3 from '../../ethereum/web3'
import './AdminPanel.css'
import ListComponent from './ListComponent'
import { Link} from 'react-router-dom'


class Adminpanel extends Component {
    
    constructor(props) {
        super(props);
        this.state = {admins: null, approvers:null, adminInput:"Enter Admin Address",approverInput:"Enter Approver Address",spin: false,spin2: false,errorMsg:"",errorMsg2:""};
        this.handleSubmitAdmin = this.handleSubmitAdmin.bind(this);
        this.handleSubmitApprover = this.handleSubmitApprover.bind(this);
    }

    async componentDidMount(){
        await window.ethereum.enable()
        try{
            const accounts = await web3.eth.getAccounts();
            const admins = await admin.methods.getAdmins().call({ from : accounts[0]});
            
            const approvers = await approver.methods.getAprrovers().call({ from : accounts[0]})
            console.log("Hello",approvers)
            this.setState({admins,approvers})
        }
        catch(e){
            console.log(e)
        }
        
    }

    

    async handleSubmitAdmin(e){
        e.preventDefault();
        this.setState({spin:true})
        await window.ethereum.enable()
        try{
            const accounts = await web3.eth.getAccounts();
            console.log("sdfd",this.state.adminInput)
            await admin.methods.addAdmin(this.state.adminInput).send({ from : accounts[0]});
            window.location.reload(false);
        }
        catch(e){
            this.setState({errorMsg: e.message})
            console.log(e)
        }
        this.setState({spin:false, adminInput:""})
    }

    async handleSubmitApprover(e){
        e.preventDefault();
        this.setState({spin2:true})
        await window.ethereum.enable()
        try{
            const accounts = await web3.eth.getAccounts();
            console.log("sdfd",this.state.approverInput)
            await approver.methods.addApprover(this.state.approverInput).send({ from : accounts[0]});
            window.location.reload(false);
        }
        catch(e){
            this.setState({errorMsg2: e.message})
            console.log(e)
        }
        this.setState({spin2:false, approverInput:""})
    }
    
    
    render() {
        // console.log(this.state.adminInput)
        return (
            <div className="adminPanel">
                <marquee scrollamount="10"  className="adminPanel__marquee"><h5>🙏🙏Operations On Ethereum block-chain take 15-30 seconds to complete. Please have some patience🙏🙏</h5></marquee>
                <div className="adminPanel__header"><hr></hr>
                <Link to="/admin/userRequestSec"><Button color="success">User Request Section</Button></Link>
                    <div className="adminPanel__headerTitle">
                        <h2>Welcome to Admin Panel </h2>
                        <img alt="" src="https://img.icons8.com/bubbles/100/000000/admin-settings-male.png"/>
                    </div>
                    <Link to="/admin/hospitalhome"><Button className="adminPanel__headerbtn" color="danger">Hospital Section</Button></Link>
                <hr></hr></div>
                <Container className="adminPanel__formConainer">
                    <Row><Col className="formConainer__col">
                        <Form  className="formConainer__form" onSubmit={this.handleSubmitAdmin}>
                            <FormGroup className="mb-2 formConainer__formgroup mr-sm-2 mb-sm-0">
                                <Label for="adminAdd" className="mr-sm-2 formConainer__label">Admin Address</Label>
                                <Input className="formConainer__input" 
                                    value={this.state.adminInput}
                                    onChange={(e) => this.setState({adminInput: e.target.value})}
                                    type="text" name="adminAdd" id="adminAdd" placeholder="Admin Address" />
                            </FormGroup>
                            {
                                !this.state.spin ?
                                <Button color="success" className="formConainer__btn">Add</Button> : 
                                <Spinner color="primary" />
                            }
                            
                        </Form>
                        {
                            this.state.errorMsg ?
                            <Alert color="danger" isOpen="true"  fade={false}>
                                {this.state.errorMsg}
                            </Alert> : null
                        }
                        
                    </Col></Row>
                    <hr></hr>
                    <Row><Col className="formConainer__col">
                        <Form className="formConainer__form" onSubmit={this.handleSubmitApprover}>
                            <FormGroup className="mb-2 formConainer__formgroup mr-sm-2 mb-sm-0">
                                <Label for="approverAdd" className="mr-sm-2 formConainer__label">Approver Address</Label>
                                <Input className="formConainer__input"
                                    value={this.state.approverInput}
                                    onChange={(e) => this.setState({approverInput: e.target.value})}
                                    type="text" name="approverAdd" id="approverAdd" placeholder="Approver Address" />
                            </FormGroup> 
                            {
                                !this.state.spin2 ?
                                <Button color="success" className="formConainer__btn">Add</Button> : 
                                <Spinner color="primary" />
                            }
                            
                        </Form>
                        {
                            this.state.errorMsg2 ?
                            <Alert color="danger" isOpen="true"  fade={false}>
                                {this.state.errorMsg2}
                            </Alert> : null
                        }
                    </Col></Row>
                </Container>
                <div className="adminPanel__listGroup" >
                    <div className="adminPanel__adminlist">
                        <div><h3>Admin's list</h3></div>
                        {   this.state.admins ? 
                            this.state.admins.map((admin) =>(
                                <ListComponent adminAdd={admin} flag={false} key={admin} />
                            )) : null
                        }
                    </div>
                    <div className="adminPanel__approverslist">
                        <div><h3>Approver's list</h3></div>
                        {   this.state.approvers ? 
                            this.state.approvers.map((approver) =>(
                                <ListComponent approverAdd={approver} flag={true} key={approver} />
                            )) : null
                        }
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Adminpanel
