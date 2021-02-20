import React, {useState} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, CustomInput} from 'reactstrap';
import './UserRegister.css'
import firebase from '../../config/fbconfig'



function UserRegister(props) {

    
    const [email, setemail] = useState("")
    const [aadhar, setaadhar] = useState("")
    const [fullname, setfullname] = useState("")
    const [mobile, setmobile] = useState("")
    const [file, setFile] = useState(null);
  

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // props.fileUpload(file)
        
            const storageRef = firebase.storage().ref()
            const fileRef = storageRef.child(`documents/${file.name}`)
            fileRef.put(file)
            .then((snap) => console.log('upload successful', snap))
            .catch((err) => console.error('error uploading file', err))
        
        


        setemail("")
        setaadhar("")
        setfullname("")
        setmobile("")
        setFile(null)
    }


    const handleDocChange = (e) => {

        setFile(e.target.files[0]);
    }



    return (
        <div className="userRegister">
            <div className="userRegister__body">
                <h3>Apply to Create Campaign</h3><br></br>
                <Form onSubmit={handleSubmit} >
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Your Name" 
                            value={fullname} 
                            onChange={e => setfullname(e.target.value)}
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
                        <Label for="aadhar">Aadhar No.</Label>
                        <Input type="text" name="aadhar" id="aadhar" placeholder="Your Aadhar no"
                            value={aadhar} 
                            onChange={e => setaadhar(e.target.value)}
                            required
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label for="mobile">Mobile No.</Label>
                        <Input type="mobile" name="mobile" id="mobile"
                            placeholder="Your Mobile No." 
                            value={mobile}
                            onChange={e => setmobile(e.target.value)}
                            />
                    </FormGroup>
                    <FormGroup>
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
                    </FormGroup>
                    <Button className="userRegister__btn" >Submit</Button>
                    <div>
                        {/* {authError ? <p>{authError}</p> : null} */}
                    </div> 
                </Form>
            </div>
        </div>
    )
}

// const mapDispatchToProps = (dispatch) => {
//     return{
//       fileUpload: (file) => dispatch(fileUpload(file))
//     }
//   }

// export default connect(null,mapDispatchToProps)(UserRegister)
export default UserRegister
