const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider());

const Admins = require('../ethereum/build/Admins.json');
const Approvers = require('../ethereum/build/Approvers.json')
const DonationSyatem = require('../ethereum/build/DonationSyatem.json')
const Hospital = require('../ethereum/build/Hospital.json')
const Hospitals = require('../ethereum/build/Hospitals.json')
const Request = require('../ethereum/build/Request.json')
const User = require('../ethereum/build/User.json')

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async() => {

    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(Admins.abi)
    .deploy({
        data: '0x' + Admins.evm.bytecode.object,
    
    })
    .send({
        from: accounts[0],
        gas: '2000000'
    });
  
});

describe('Campaigns', () =>{

    it('has deployed factory and campaign', () => {

       
        assert.ok(factory.options.address);
    });
});