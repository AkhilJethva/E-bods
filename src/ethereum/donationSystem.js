import web3 from './web3'
import DonationSystem from './build/DonationSystem.json'


const donationSystemInstance = new web3.eth.Contract(
    DonationSystem.abi,
    '0x605F3618476ae28489aAD6A3b4dEdb047A81aC17'
);


export default donationSystemInstance
