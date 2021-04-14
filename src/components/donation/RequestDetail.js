import React,{useState,useEffect} from 'react'
import { Button,Breadcrumb, BreadcrumbItem, CardHeader, Col, Container, Row ,ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Label, Input, Alert, Form, FormGroup} from 'reactstrap'
import './RequestDetail.css'
import firebase from '../../config/fbconfig'
import web3 from '../../ethereum/web3'
import Request from '../../ethereum/request'
import Lottie from 'react-lottie';
import Spin from '../../animations/46472-lurking-cat.json'




function RequestDetail(props) {
    const [requestAddress, setrequestAddress] = useState(props.location.pathname.substr(10));
    const [Data, setData] = useState(null)
    const [etherValue, setetherValue] = useState("")
    const [DonarName, setDonarName] = useState("")
    const [Spinner, setSpinner] = useState(false)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Spin,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    useEffect( async() => {
        // firebase.firestore().collection('User').get()
        console.log(requestAddress)
        const docId = requestAddress
        var docRef = firebase.firestore().collection(`User`).doc(`0x${docId}`);
        console.log(docRef)
        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setData(doc.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        return () => {
            
        }
    }, [])

    const onDonateHandle = async(e) =>{
        e.preventDefault();
        setSpinner(true);
        try{

            const accounts = await web3.eth.getAccounts();
            const request = Request(requestAddress);
            await request.methods.donate(DonarName).send({
                from : accounts[0],
                value : web3.utils.toWei(etherValue,'ether'
                )
            })

        }catch(error){
            console.log(error);
            setSpinner(false)
        }
        setetherValue("")
        setDonarName("")
        setSpinner(false)
    }


    return (
        <div className="requestDetail">
            <Breadcrumb>
                <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                <BreadcrumbItem><a href="#">Donate</a></BreadcrumbItem>
                <BreadcrumbItem active>{requestAddress}</BreadcrumbItem>
            </Breadcrumb>
            <Container fluid className="requestDetail__grid">
                <Row>
                    <Col xs="12" sm="6" className="deatailSection">
                        <CardHeader className="deatailSection__header" >{Data ? Data.Title : null}</CardHeader>

                        <Container className="deatailbelow">
                            <Row>
                                <Label sm={3}>Title :: </Label>
                                <Col> <Alert color="warning">{Data ? Data.Title : null}</Alert></Col>
                            </Row>
                            <Row>
                                <Label sm={3}>Amount Of Donation Required :: </Label>
                                <Col><Alert color="warning">{Data ? Data.DonationValue : null}</Alert></Col>
                            </Row>
                            <Row>
                                <Label sm={3}>Email :: </Label>
                                <Col><Alert color="warning">{Data ? Data.Email : null}</Alert></Col>
                            </Row>
                            <Row>
                                <Label sm={3}>Hospital Name</Label>
                                <Col><Alert color="warning">{Data ? Data.hospitalAddress : null}</Alert></Col>
                            </Row>
                            <Row>
                                <Label sm={3}>Request Created At :: </Label>
                                <Col><Alert color="warning">{Data ? Date(Data.Date) : null}</Alert></Col>
                            </Row>
                            <Row>
                                <Label sm={3}>See The Documents</Label>
                                <Col><Alert color="warning"><a href={Data ? Data.DocumentUrl : null} target="_blank" ><Button color="danger" outline>Click ME</Button> </a></Alert></Col>
                            </Row>
                            
                        </Container>
                    </Col>
                    <Col >
                        <ListGroup>
                            <ListGroupItem active>
                                <ListGroupItemHeading>Contribution Section</ListGroupItemHeading>
                                <ListGroupItemText>
                                    Donate the Ethere Here.
                                </ListGroupItemText>
                            </ListGroupItem>
                            <ListGroupItem>
                            <Form >
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="dName" className="mr-sm-2">Your Name</Label>
                                    <Input 
                                        type="text" name="dName" id="dName" 
                                        value={DonarName}
                                        onChange={event=> setDonarName(event.target.value)}
                                        placeholder="Donor's Name" />
                                </FormGroup><br></br>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="ethreVal" className="mr-sm-2">Amount To Contribute</Label>
                                    <Input 
                                        type="number" name="ethreVal" id="ethreVal" 
                                        value={etherValue}
                                        onChange={event=> setetherValue(event.target.value)}
                                        placeholder="X Etheres" />
                                </FormGroup><br></br>
                                    {  !Spinner ? <Button onClick={onDonateHandle}>Submit</Button>
                                        :
                                    <Lottie 
                                        options={defaultOptions}
                                        height={100}
                                        width={100}
                                        />}
                                </Form>
                            </ListGroupItem>
                            
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RequestDetail
