import React,{useState,useEffect} from 'react'
import { Button, Card, CardText, CardTitle, Col, Container, Row, Table } from 'reactstrap'
import './UserRequestSec.css'
import web3 from '../../ethereum/web3'
import User from '../../ethereum/user'
import donationSystem from '../../ethereum/donationSystem'

import Lottie from 'react-lottie';
import allUser from '../../animations/55356-chris-gannon.json'
import activeUs from '../../animations/29780-users-and-vr-loop.json'
import activeReq from '../../animations/7843-flixxo-coins.json'
import pendingReq from '../../animations/5527-alert-notification-character.json'
import DonationRequest from '../donation/DonationRequest'


function UserRequestSec() {

    const [PendingRequest, setPendingRequest] = useState(null)
    const [Array1, setArray1] = useState([1,2,3,4,5,6])

    const defaultOptions0 = {
        loop: true,
        autoplay: true,
        animationData: allUser,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const defaultOptions1 = {
        loop: true,
        autoplay: true,
        animationData: activeUs,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const defaultOptions2 = {
        loop: true,
        autoplay: true,
        animationData: pendingReq,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const defaultOptions3 = {
        loop: true,
        autoplay: true,
        animationData: activeReq,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    

    useEffect(async() => {
        
        let allpendingRequestList = []
        await window.ethereum.enable()
        try{
        const accounts = await web3.eth.getAccounts();
        const deployedUsers = await donationSystem.methods.getDeployedUsers().call({from: accounts[0]});
        console.log("hu j chu",deployedUsers);
        // setdeployesUserList(deployedUsers);
        
        deployedUsers.map(async(userAddress) => {
            const user = User(userAddress);
            const reqList = await user.methods.getRequests().call({from: accounts[0]});
            reqList.map(req => {
                console.log("Request Is ::",req)
                allpendingRequestList.push(req)  
            })
        })

        
        console.log("Akhil",allpendingRequestList)
        setPendingRequest(allpendingRequestList)}
        catch(e){

        }
        return () => {
            
        }
    }, [])


    console.log("BDhjsabk",PendingRequest)
    return (
        <Container className="userRequestSec" fluid>
            <div className="userRequestSec__header">
                <h3>User Requests Section,</h3>
            </div>
            <div>
                <Row>
                    <Col xs="12" sm="3">
                        <Card body>
                        <CardTitle className="cardTitlesAlign" tag="h5">Available Users <Lottie 
                            options={defaultOptions0}
                            height={100}
                            width={100}
                            /></CardTitle>
                        <CardText className="cardTitlesAlign"><h4>132</h4> <p className="cardTextLight">Since last Month</p></CardText>
                        </Card>
                    </Col>
                    <Col xs="6" sm="3">
                        <Card body>
                        <CardTitle className="cardTitlesAlign" tag="h5">Active Users <Lottie 
                            options={defaultOptions1}
                            height={100}
                            width={100}
                            /></CardTitle>
                        <CardText className="cardTitlesAlign"><h4>56</h4> <p className="cardTextLight">Since last Month</p></CardText>
                        </Card>
                    </Col>
                    <Col xs="6" sm="3">
                        <Card body>
                        <CardTitle className="cardTitlesAlign" tag="h5">Active Requests<Lottie 
                            options={defaultOptions3}
                            height={100}
                            width={100}
                            /></CardTitle>
                        <CardText className="cardTitlesAlign"><h4>294</h4> <p className="cardTextLight">Since last Month</p></CardText>
                        </Card>
                    </Col>
                    <Col xs="12" sm="3">
                        <Card body>
                        <CardTitle className="cardTitlesAlign" tag="h5">Pending Requests<Lottie 
                            options={defaultOptions2}
                            height={100}
                            width={100}
                            /></CardTitle>
                        <CardText className="cardTitlesAlign"><h4>39</h4> <p className="cardTextLight">Since last Month</p></CardText>
                        </Card>
                    </Col>
                    {PendingRequest ? PendingRequest.map(req => (
                            <DonationRequest   key={req} reqAdd={req} />
                        ) ) : null}
                </Row>
            </div>

            <div>
                <Card style={{padding: "10px", marginTop:"10px", marginBottom:"10px"}}><h2>Approve Table</h2>
                <Card className="requestTable"  body>
                        
                        <Table  hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>User Name</th> 
                                <th>Request Name</th>
                                <th>Amount Require</th>
                                <th>Documents</th>
                                <th>Approve</th>
                                </tr>
                            </thead>
                            <tbody >
{/*                                 
                                {
                                    PendingRequest ? PendingRequest.map(preq => (
                                            <tr>
                                            <th scope="row">1</th>
                                            <td>{preq}</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Otto</td>
                                            <Button color="success">Approve</Button>
                                            </tr>
                                        )
                                    ) : null
                                // } */}
                                <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr><tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr><tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                
                            </tbody>
                        </Table>
                </Card></Card>
            </div>
            <div>
                <Card style={{padding: "10px", marginTop:"10px", marginBottom:"10px"}}><h2>Final Complete Table</h2>
                <Card className="requestTable"  body>
                        
                        <Table  hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>User Name</th> 
                                <th>Request Name</th>
                                <th>Amount Require</th>
                                <th>Documents</th>
                                <th>Approve</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Otto</td>
                                <Button color="success">Approve</Button>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                            </tbody>
                        </Table>
                </Card></Card>
            </div>
        </Container>
    )
}

export default UserRequestSec
