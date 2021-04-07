import React from 'react'
import { Button, Card, CardText, CardTitle, Col } from 'reactstrap'

function DonationRequest() {
    return (
        <Col sm="6" xs="12" >
        <div className="donationRequest"> 
            <Card body>
                <CardTitle tag="h5">Request Title</CardTitle>
                <CardText>Requested Fundings ::  ,   </CardText>
                <CardText><Button color="success">Give Penny</Button> <Button color="primary">See Documents</Button></CardText>
            </Card>
        </div>
        </Col>
    )
}

export default DonationRequest
