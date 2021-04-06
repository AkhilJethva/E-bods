import web3 from './web3'
import Hospitals from './build/Hospitals.json'


const hospitalsInstance = new web3.eth.Contract(
    Hospitals.abi,
    '0x510F3e5D91F8CD29af16817E755A25e10f877E93'
);


export default hospitalsInstance