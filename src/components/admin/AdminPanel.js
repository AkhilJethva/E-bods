import React, { Component } from 'react'
import admin from '../../ethereum/admin';
import web3 from '../../ethereum/web3'

export class Adminpanel extends Component {

    async componentDidMount(){
        await window.ethereum.enable()

        console.log("sdfbsd ")
        try{
            const accounts = await web3.eth.getAccounts();
            const admins = await admin.methods.getAdmins().call({ from : accounts[0]});
            console.log("aab",admins);
        }
        catch(e){
            console.log(e)
        }
        
    }

    render() {
        return (
            <div>
                <h1> textInComponent </h1>
            </div>
        )
    }
}

export default Adminpanel
