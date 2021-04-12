import web3 from './web3'
import Hospitals from './build/Hospitals.json'


const hospitalsInstance = new web3.eth.Contract(
    Hospitals.abi,
    '0x714A5BABDEd9a9431f27E8E98c05Fb814928C059'
);


export default hospitalsInstance