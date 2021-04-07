import web3 from './web3'
import Hospitals from './build/Hospitals.json'


const hospitalsInstance = new web3.eth.Contract(
    Hospitals.abi,
    '0x6057020B83cAF4F7c369c252598B9FdFaA87D6A9'
);


export default hospitalsInstance