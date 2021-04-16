import React, { useEffect,useState } from 'react'
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap'
import './UserRequest.css'
// import web3 from '../../ethereum/web3'
// import Request from '../../ethereum/request'
import firebase from '../../config/fbconfig'

function UserRequest(props) {

    const {requestAddress} = props;
    const [Data, setData] = useState(null)

    useEffect(async() => {
        try{

            // const accounts = await web3.eth.getAccounts();
            // const request = Request(requestAddress);

            var docRef = firebase.firestore().collection(`User`).doc(`${requestAddress}`);
            
            docRef.get().then(async(doc) => {
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
        }catch(error){

        }
        
        return () => {
            
        }
    }, [])
    console.log(Data)
    return (
        <div className="userRequest">
            <Card className="userRequest__card">
                <CardHeader>{Data ? Data.Title : null}</CardHeader>
                <CardBody>
                    <CardTitle tag="h5">Donation Value ::  {Data ? Data.DonationValue : null} ether</CardTitle>
                    <CardText>Created At ::  { Data ? Date(Data.Time) : null }</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

export default UserRequest
