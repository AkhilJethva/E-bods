import web3 from './web3'
import Hospital from './build/Hospital.json'

export default (address) => {
    return new web3.eth.Contract(
        Hospital.abi,
        address
    );
};
