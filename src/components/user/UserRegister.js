import React, {useState,useEffect,Component} from 'react'
import { Button, Form, FormGroup, Label, Input,Alert, FormText, CustomInput} from 'reactstrap';
import './UserRegister.css'
import web3 from '../../ethereum/web3'
import admin from '../../ethereum/admin';
import donationSystem from '../../ethereum/donationSystem'
import firebase from '../../config/fbconfig'
import { Link } from 'react-router-dom';



// function UserRegister(props) {

    
//     const [email, setemail] = useState("")
//     const [aadhar, setaadhar] = useState("")
//     const [fullname, setfullname] = useState("")
//     const [mobile, setmobile] = useState("")
//     // const [file, setFile] = useState(null);
    
//     useEffect(async() => {

//         await window.ethereum.enable()
//         try{
//             const accounts = await web3.eth.getAccounts();
//             // const admins = await admin.methods.getAdmins().call({ from : accounts[0]});
//             const us = await donationSystem.methods.getDeployedUsers().call({ from : accounts[0], gas: '8000000'});
//             console.log("Hello",us)
//         }
//         catch(e){
//             console.log(e)
//         }
        
//         return () => {
            
//         }
//     }, [])



//     const handleSubmit = (event) => {
//         event.preventDefault();
        
//         // props.fileUpload(file)
//             // Code to upload file in firebase
//             // const storageRef = firebase.storage().ref()
//             // const fileRef = storageRef.child(`documents/${file.name}`)
//             // fileRef.put(file)
//             // .then((snap) => console.log('upload successful', snap))
//             // .catch((err) => console.error('error uploading file', err))
        
        

//         console.log(email,aadhar,fullname,mobile)
//         setemail("")
//         setaadhar("")
//         setfullname("")
//         setmobile("")
        
//     }


//     // const handleDocChange = (e) => {

//     //     setFile(e.target.files[0]);
//     // }



//     return (
//         <div className="userRegister">
//             <div className="userRegister__body">
//                 <h3>Register Your Self here :: </h3><br></br>
//                 <Form onSubmit={handleSubmit} >
//                     <FormGroup>
//                         <Label for="name">Name</Label>
//                         <Input type="text" name="name" id="name" placeholder="Your Name as on Addhar" 
//                             value={fullname} 
//                             onChange={e => setfullname(e.target.value)}
//                             required
//                             />
//                     </FormGroup>
                    
//                     <FormGroup>
//                         <Label for="exampleEmail">Email</Label>
//                         <Input type="email" name="email" id="exampleEmail"
//                             value={email}
//                             placeholder="xyz@abc.com" 
//                             onChange={e => setemail(e.target.value)}
//                             required
//                             />
//                     </FormGroup>
//                     <FormGroup>
//                         <Label for="aadhar">Aadhar No.</Label>
//                         <Input type="text" name="aadhar" id="aadhar" placeholder="Your Aadhar no"
//                             value={aadhar} 
//                             onChange={e => setaadhar(e.target.value)}
//                             required
//                             />
//                     </FormGroup>
//                     <FormGroup>
//                         <Label for="mobile">Mobile No.</Label>
//                         <Input type="mobile" name="mobile" id="mobile"
//                             placeholder="Your Mobile No." 
//                             value={mobile}
//                             onChange={e => setmobile(e.target.value)}
//                             required
//                             />
//                     </FormGroup>
//                     {/* <FormGroup>
//                         <Label for="documents">Documents</Label>
//                         <CustomInput type="file"

//                             onChange={ handleDocChange}
//                             id="exampleCustomFileBrowser" name="customFile"  />
//                         <FormText color="muted">
//                             This is some placeholder block-level help text for the above input.
//                             It's a bit lighter and easily wraps to a new line.
//                         </FormText>
//                     </FormGroup>
//                     <FormGroup check>
//                         <Label check>
//                         <Input type="checkbox" id="checkbox2" />{' '}
//                         Check me out
//                         </Label>
//                     </FormGroup> */}
//                     <Button className="userRegister__btn" >Submit</Button>
//                     <div>
//                         {/* {authError ? <p>{authError}</p> : null} */}
//                     </div> 
//                 </Form>

//                 <div className="userRegister__bottomLine">Already Have an Acoount? <Link to="">click here</Link> </div>
//             </div>
//         </div>
//     )
// }

// // const mapDispatchToProps = (dispatch) => {
// //     return{
// //       fileUpload: (file) => dispatch(fileUpload(file))
// //     }
// //   }

// // export default connect(null,mapDispatchToProps)(UserRegister)
// export default UserRegister

class UserRegister extends Component{
    constructor(props) {
        super(props);
        this.state = {email:"", aadhar:"",fullname:"",mobile:""};
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
        await window.ethereum.enable()
        try{
            const accounts = await web3.eth.getAccounts();
            console.log("sdfd",this.state)
            const add = await donationSystem.methods.createUserContact(this.state.fullname,this.state.email,this.state.aadhar,this.state.mobile).send({ from : accounts[0]});
            console.log("my",add)
        }
        catch(e){
            console.log(e)
        }
        
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
                    <Button className="userRegister__btn" >Submit</Button>
                    <div>
                        {/* {authError ? <p>{authError}</p> : null} */}
                    </div> 
                </Form>

                <Alert color="dark">
                    This is a dark alert — check it out!
                </Alert>

                <div className="userRegister__bottomLine">Already Have an Acoount? <Link to="">click here</Link> </div>
            </div>
        </div>
        )
    }
}
export default UserRegister