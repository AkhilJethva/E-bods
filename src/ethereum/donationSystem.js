import web3 from './web3'
import DonationSystem from './build/DonationSystem.json'


const donationSystemInstance = new web3.eth.Contract(
    DonationSystem.abi,
    '0xAa087593E3f58C1a749a033f33C3991347fbA272'
);


export default donationSystemInstance
