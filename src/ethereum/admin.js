import web3 from './web3'
import Admin from './build/Admins.json'


const adminInstance = new web3.eth.Contract(
    Admin.abi,
    '0x6666E59DFbF51753C42a720E23fde07f9189626F'
);


export default adminInstance