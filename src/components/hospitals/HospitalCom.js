import React,{useState,useEffect} from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col } from 'reactstrap';
import './HospitalCom.css'
import Hospital from '../../ethereum/hospital';
import web3 from '../../ethereum/web3'


function HospitalCom(props) {
    const { Haddress } = props;
    const [Hname, setHname] = useState("")
    const [Hmail, setHmail] = useState("")
    
    const [Hlocation, setHlocation] = useState("")
    const [Hnumber, setHnumber] = useState("")

    useEffect( async() => {
        await window.ethereum.enable();
        try{
            const accounts = await web3.eth.getAccounts();
            const hospital = Hospital(Haddress); 
            const name = await hospital.methods.hospitalName().call({ from : accounts[0]});
            setHname(name)

            const email = await hospital.methods.hospitalEmail().call({ from : accounts[0]});
            setHmail(email)

            const location = await hospital.methods.hospitalLocation().call({ from : accounts[0]});
            setHlocation(location)

            const phone = await hospital.methods.hospitalPhone().call({ from : accounts[0]});
            setHnumber(phone)


        }
        catch(e){
            console.log(e)
        }
        return () => {
            
        }
    }, [])


    return (
        <Col className="hospitalComp" sm={5}>
            <Card>
                <CardHeader tag="h4">{Hname}</CardHeader>
                <CardBody className="hospitaCard__body">
                    <div>
                    <CardTitle>{Hmail}</CardTitle>
                    <CardText>{Hlocation}, Contact No:: {Hnumber}</CardText>
                    </div>
                    <Button className="hospitaCard__btn" color="danger">Remove</Button>
                </CardBody>
                <CardFooter>{Haddress}</CardFooter>
            </Card>
        </Col>
    )
}

export default HospitalCom
