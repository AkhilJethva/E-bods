import React,{useState,useEffect} from 'react'
import { Alert,Button } from 'reactstrap'
import './UserHome.css'
import User from '../../ethereum/user'
import web3 from '../../ethereum/web3'
import UserRequest from './UserRequest'

function UserHome(props) {

    const [userAddress, setuserAddress] = useState(props.location.pathname.substr(10))
    const [uname, setuname] = useState("")

    useEffect(async() => {
        
        await window.ethereum.enable()
        const accounts = await web3.eth.getAccounts();
        const user = User(userAddress);
        const name = await user.methods.name().call({from: accounts[0]});
        setuname(name)
        console.log("user name",name)
        return () => {
            
        }
    }, [])
    
    return (
        <div className="userHome">
            <div className="userHome__upper">
                <Alert className="upper__header" color="info">
                    <Button className="upper__btnlft" outline color="danger">Create FundRaiser</Button>
                    <h4>{uname}'s Dashboard</h4>
                    <Button className="upper__btnrgt" outline color="danger">AJ</Button>
                </Alert>
            </div>
            <div className="userHome__list">
                <div className="userHome__requestlist">
                        <div><h3>Your Requests lists</h3></div>
                        <UserRequest />
                </div>
            </div>
        </div>
    )
}

export default UserHome
