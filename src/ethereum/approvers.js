import web3 from './web3'
import Approvers from './build/Approvers.json'


const approversInstance = new web3.eth.Contract(
    Approvers.abi,
    '0x1B1386Fb5dD168eBf22D7CAF38D9254E35064Df0'
);


export default approversInstance