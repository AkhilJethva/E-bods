import React, { useEffect,useState } from 'react'
import { Button, Card, CardText, CardTitle, Col } from 'reactstrap'
import web3 from '../../ethereum/web3'
import Request from '../../ethereum/request'
import { Link } from 'react-router-dom';

function DonationRequest(props) {
    const {reqAdd} = props;

    const [Title, setTitle] = useState("")
    const [DonationVal, setDonationVal] = useState("")

    useEffect(async() => {
        
        await window.ethereum.enable()
        try{
        const accounts = await web3.eth.getAccounts();
        const request = Request(reqAdd);
        console.log("Request Contract",await request.methods)
        const title = await request.methods.name().call({from: accounts[0]});
        setTitle(title);
        const val = await request.methods.donationValue().call({from: accounts[0]});
        setDonationVal(val);
        // const deployedUsers = await request.methods.getDeployedUsers().call({from: accounts[0]});
        
        }
        catch(e){

        }


        return () => {
            
        }
    }, [])

    return (
        <Col sm="6" xs="12" >
        <div className="donationRequest"> 
            <Card body>
                <CardTitle tag="h5">{Title}</CardTitle>
                <CardText>Requested Fundings :: {DonationVal} , Ethere   </CardText>
                <CardText><Link to={`/donate/${reqAdd}`}><Button color="success">Give Penny</Button></Link></CardText>
            </Card>
        </div>
        </Col>
    )
}

export default DonationRequest
