import React,{useState} from 'react'
import { Card,  CardTitle,Button, Spinner} from 'reactstrap'
import "./ListComponent.css";
import admin from '../../ethereum/admin';
import approver from '../../ethereum/approvers';
import web3 from '../../ethereum/web3'


function ListComponent(props) {
    const {adminAdd,approverAdd} = props

    const [spin, setspin] = useState(false)
    console.log(adminAdd,"-> ",approverAdd)
    const handleRemove = async() => {
        setspin(true)
        await window.ethereum.enable();
        try{
            const accounts = await web3.eth.getAccounts();
            if(adminAdd){
                await admin.methods.removeAdmin(adminAdd).send({ from: accounts[0]})
            }else{
                await approver.methods.removeApprover(approverAdd).send({ from: accounts[0]})
            }
            window.location.reload(false);
        }
        catch(e){
            console.log(e)
            alert(`Oh look,${e.message}`)
            
        }
        setspin(false)
    }

    return (
        <div className="listComponent">
            <Card className="listComponent__card" body outline color="success">
                <CardTitle className="card__title" tag="h5">{adminAdd ? adminAdd : approverAdd}</CardTitle>
                
                {
                    !spin ?
                    <Button className="card__btn" onClick={handleRemove} color="danger">Remove</Button> : 
                    <Spinner className="card__btn" color="primary" />
                }
                
                
            </Card>
        </div>
    )
}

export default ListComponent
