import React,{useState,useEffect} from 'react'
import { Alert,Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Form, UncontrolledCollapse,Col,   FormGroup, Label, Input, FormText, CustomInput, CardHeader   } from 'reactstrap'
import './UserHome.css'
import User from '../../ethereum/user'
import web3 from '../../ethereum/web3'
import UserRequest from './UserRequest'
import ubg from '../../Images/BackGround/ubg.jpg'
import hospitals from '../../ethereum/hospitals';
import { connect } from 'react-redux'
import Firebase from '../../config/fbconfig';


function UserHome(props) {

    const [userAddress, setuserAddress] = useState(props.location.pathname.substr(10))
    const [uname, setuname] = useState("")
    const {auth} = props;
    const [HospitalList, setHospitalList] = useState(null)
    const [USerRequestList, setUSerRequestsList] = useState(null)

    useEffect(async() => {
        
        await window.ethereum.enable()
        try{
        const accounts = await web3.eth.getAccounts();
        const user = User(userAddress);
        const name = await user.methods.name().call({from: accounts[0]});
        setuname(name)

        const requestList= await user.methods.getRequests().call({from: accounts[0]});
        setUSerRequestsList(requestList)

        const hospitalsList = await hospitals.methods.getDeployedHospitals().call({ from : accounts[0]});
        setHospitalList(hospitalsList);
        }
        catch(e){

        }
        
        return () => {
            
        }
    }, [])
    console.log("Cool",USerRequestList)
    // code for new request form

    const [title, settitle] = useState("")

    const [donationvalue, setdonationvalue] = useState("")
    const [hospitalAddress, sethospitalAddress] = useState("")
    const [userDocuments, setuserDocuments] = useState(null)


    const onFileChange = event => {
    
        // Update the state
        setuserDocuments(event.target.files[0])
        
    
    };

    const onRequestFormSubmit = async(event) =>{
        event.preventDefault();
        try{
            const accounts = await web3.eth.getAccounts();
            const user = User(userAddress);
            await user.methods.createRequest(hospitalAddress,donationvalue,title,new Date()).send({from: accounts[0]});

            const uploadTask = Firebase.storage().ref(`documents/${userDocuments.name}`).put(userDocuments);
            console.log(uploadTask);
            uploadTask.on('state_changed',
            snapshot => { },
            error => {
                console.log(error);

            },
            () => {
                Firebase.storage().ref("documents")
                    .child(userDocuments.name)
                    .getDownloadURL()
                    .then(url => { console.log(url); });
            })


            
        }
        catch(error){

        }
    }

    return (
            <div className="userHome">
                <div className="userHome__upper">
                    <Alert className="upper__header" color="info">
                        <Button className="upper__btnlft" outline color="danger" id="toggler">Create FundRaiser</Button>
                        
                        <h4>{uname}'s Dashboard</h4>
                        <Button className="upper__btnrgt" outline color="danger">AJ</Button>
                    </Alert>
                </div>
                <div className="userHome__dialog">
                    <UncontrolledCollapse toggler="#toggler">
                        <Card>
                            <CardHeader className="card__header"><h3>Fund Raiser Form</h3></CardHeader>
                            <CardBody>
                                <Form className="request__form">
                                    <FormGroup row>
                                        <Label for="title" sm={2}>Title</Label>
                                        <Col sm={10}>
                                        <Input type="text" value={title}
                                            onChange={e => settitle(e.target.value)}
                                            name="title" id="title" placeholder="Title for your fundraisers" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="Donation" sm={2}>Donation</Label>
                                        <Col sm={10}>
                                        <Input type="number"
                                            value={donationvalue}
                                            onChange={e => setdonationvalue(e.target.value)}
                                            name="donation" id="donation" placeholder="Enter Donation Value" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleSelect" sm={2}>Select</Label>
                                        <Col sm={10}>
                                        <Input type="select" 
                                            value={hospitalAddress}
                                            onChange={e => sethospitalAddress(e.target.value)}
                                            name="select" id="exampleSelect">
                                            {
                                                HospitalList? HospitalList.map(hospital =>(
                                                    <option value={hospital}>Pqr</option>
                                                )) : <option >NO Hospital Available</option>
                                            }
                                        </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleCustomFileBrowser" sm={2}>File Browser with Custom Label</Label>
                                        <Col sm={10}>
                                        <CustomInput type="file" 
                                            onChange={onFileChange}
                                            id="exampleCustomFileBrowser" name="customFile" label="Yo, pick a file!" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup check row>
                                        <Col sm={{ size: 10, offset: 2 }}>
                                        <Button color="primary" className="request__btn" onClick={onRequestFormSubmit}>Submit</Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </UncontrolledCollapse>
                </div>

                <div className="userHome__bottom">
                    
                        <div className="userHome__requestlist">
                            <CardHeader className="requestlist__header"><h3>Your Request List</h3></CardHeader>
                                <div className="requestList__overflow">
                                {
                                    USerRequestList ? USerRequestList.map(requestAdd => (
                                        <UserRequest key={requestAdd} requestAddress={requestAdd } />
                                    )) : null
                                }
                                </div>
                                
                        </div>
                    <div className="userHome__profile">
                        <Card className="profile___card">
                            <CardImg top className="profile__cardImg" width="5%" src={ubg} alt="Card image cap" />
                            <CardBody>
                            <CardTitle tag="h5">{uname}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <Button>Button</Button>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(UserHome)
