import web3 from './web3'
import DonationSystem from './build/DonationSystem.json'


const donationSystemInstance = new web3.eth.Contract(
    DonationSystem.abi,
    '0x9C9b45093bE5b1Dd338389eD1dFD89dEe3C38814'
);


export default donationSystemInstance