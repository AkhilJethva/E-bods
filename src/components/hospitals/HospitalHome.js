
import React,{useEffect, useState} from 'react'
import { Col, Container, Form, FormGroup, Input, Label, Button, UncontrolledCollapse, Card, CardBody, CardHeader, Row, CardTitle } from 'reactstrap'
import HospitalCom from './HospitalCom'
import './HospitalHome.css'
import hospitals from '../../ethereum/hospitals';
import web3 from '../../ethereum/web3'
import Firebase from '../../config/fbconfig'

function HospitalHome() {

    const [Hname, setHname] = useState("")
    const [Hmail, setHmail] = useState("")
    const [HacAdrress, setHacAdrress] = useState("")
    const [Hlocation, setHlocation] = useState("")
    const [Hnumber, setHnumber] = useState("")
    const [HospitalList, setHospitalList] = useState(null)


    const HandleHospitalSubmit = async(e) =>{
        e.preventDefault();
        console.log(HacAdrress,Hname,Hmail,Hlocation,Hnumber);
        const accounts = await web3.eth.getAccounts();
        await hospitals.methods.createHospitalContract(HacAdrress,Hname,Hmail,Hlocation,Hnumber).send({ from : accounts[0]});

        Firebase.firestore().collection(`Hospitals`).add({
            hospitalAddress: HacAdrress,
            HospitalName: Hname,
            HospitalEmail : Hmail,
            HospitalLocation : Hlocation,
            HospitalContact : Hnumber,
            Time : new Date(),
        });
        console.log("Data Stored")
    

    }

    useEffect(async() => {

        await window.ethereum.enable();
        try{
            const accounts = await web3.eth.getAccounts();
            const hospitalsList = await hospitals.methods.getDeployedHospitals().call({ from : accounts[0]});
            setHospitalList(hospitalsList);
        }
        catch(e){
            console.log(e)
        }
        
        return () => {
            
        }
    }, [HospitalList])




    return (
        <div className="hopitalHome">
            <div className="hospitalHome__header">
                <hr></hr>
                        <h2>Welcome to Hospital Section </h2>
                        <img src="https://img.icons8.com/plasticine/100/000000/hospital-room.png"/>
                <hr></hr>
            </div>
            <Container className="hopitalHome__formConainer">
                
                <Button className="formtoggle__btn" color="primary" id="toggler" >
                    Add New Hospital
                </Button>
                <UncontrolledCollapse toggler="#toggler">
                    <Card>
                        <CardHeader tag="h3">New Hospital Form</CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup row>
                                    <Label for="Hname" sm={2}>Hospital name</Label>
                                    <Col sm={10}>
                                    <Input type="text" name="Hname" id="Hname"
                                        value={Hname}
                                        onChange={event => setHname(event.target.value)}
                                        placeholder="Hospital name" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="Email" sm={2}>Hospital Email</Label>
                                    <Col sm={10}>
                                    <Input type="email" name="Email" id="Email"
                                        value={Hmail}
                                        onChange={event => setHmail(event.target.value)}
                                        placeholder="Email" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="AccAddress" sm={2}>Hospital Account Address</Label>
                                    <Col sm={10}>
                                    <Input type="text" name="AccAddress" id="AccAddress" 
                                        value={HacAdrress}
                                        onChange={event => setHacAdrress(event.target.value)}
                                        placeholder="Hospital Account Address" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="Hlocation" sm={2}>Hospital Location</Label>
                                    <Col sm={10}>
                                    <Input autoFocus type="select" name="Hlocation"
                                        value={Hlocation}
                                        onChange={event => setHlocation(event.target.value)}
                                        id="Hlocation">
                                        <option>Mumbai</option>
                                        <option>Pune</option>
                                        <option>Ahmedabad</option>
                                        <option>Bengaluru </option>
                                        <option>Chennai</option>
                                    </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="Hnumber" sm={2}>Hospital's contact No.</Label>
                                    <Col sm={10}>
                                    <Input type="text" name="Hnumber" id="Hnumber"
                                        value={Hnumber}
                                        onChange={event => setHnumber(event.target.value)}
                                        placeholder="Hospital's contact No." />
                                    </Col>
                                </FormGroup>
                                <Button color="success" onClick={HandleHospitalSubmit}>Add Hospital</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </UncontrolledCollapse>
            </Container>

            <div className="hospitalHome__hlist">
                <hr></hr>
                <h3>Hospital list</h3>
                <hr></hr>
                <Row>

                        {   HospitalList ? 
                            HospitalList.map((hospital) =>(
                                <HospitalCom key={hospital} Haddress={hospital} />
                            )) : null
                        }
                    {/* <HospitalCom />
                    <HospitalCom />
                    <HospitalCom /> */}
                </Row>
            </div>
        </div>
    )
}

export default HospitalHome
