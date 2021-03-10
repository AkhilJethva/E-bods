import React from 'react'
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap'
import './UserRequest.css'

function UserRequest() {
    return (
        <div className="userRequest">
            <Card className="userRequest__card">
                <CardHeader>Header</CardHeader>
                <CardBody>
                    <CardTitle tag="h5">Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

export default UserRequest
