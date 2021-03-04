import web3 from './web3'
import DonationSystem from './build/DonationSystem.json'


const donationSystemInstance = new web3.eth.Contract(
    DonationSystem.abi,
    '0xA05BE3501793cf8141a9ceaEb4e9e9b593d83F3c'
);


export default donationSystemInstance