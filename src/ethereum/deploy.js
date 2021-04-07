const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const admin = require('./build/Admins.json');
const approvers = require('./build/Approvers.json')
const donationSystem = require('./build/DonationSystem.json')
const hospital = require('./build/Hospital.json')
const hospitals = require('./build/Hospitals.json')
const request = require('./build/Request.json')
const user = require('./build/User.json')

const provider = new HDWalletProvider(
    'dog august negative humble yellow busy margin hundred jelly visual quote duck',
    'https://rinkeby.infura.io/v3/4f7c68aa34634717962e74e2e49b6c2f'
);

const web3 = new Web3(provider);
(async () => {
	const accounts = await web3.eth.getAccounts();

	console.log(`Attempting to deploy from account: ${accounts[0]}`);
		// //deploy admin
		// const AdmindeployedContract = await new web3.eth.Contract(admin.abi)
		// .deploy({
		// 	data: '0x' + admin.evm.bytecode.object,
		
		// })
		// .send({
		// 	from: accounts[0],
		// 	gas: '2000000'
		// });

		// //deploy approvers
		// const approversdeployedContract = await new web3.eth.Contract(approvers.abi)
		// .deploy({
		// 	data: '0x' + approvers.evm.bytecode.object,
		// 	arguments: ['0x6666E59DFbF51753C42a720E23fde07f9189626F']
		// })
		// .send({
		// 	gas: '2000000',
		// 	from: accounts[0]
		// });

		
		// deploy donation system
		const DonationSystemdeployedContract = await new web3.eth.Contract(donationSystem.abi)
		.deploy({
			data: '0x' + donationSystem.evm.bytecode.object,
			arguments: ['0x6666E59DFbF51753C42a720E23fde07f9189626F','0x1B1386Fb5dD168eBf22D7CAF38D9254E35064Df0','0x6057020B83cAF4F7c369c252598B9FdFaA87D6A9']
		
		})
		.send({
			from: accounts[0],
			gas: '6000000'
		});

		// //deploy hospital
		// const HospitaldeployedContract = await new web3.eth.Contract(hospital.abi)
		// .deploy({
		// 	data: '0x' + hospital.evm.bytecode.object,
		
		// })
		// .send({
		// 	from: accounts[0],
		// 	gas: '2000000'
		// });

		// //deploy hospitals
		// const HospitalsdeployedContract = await new web3.eth.Contract(hospitals.abi)
		// .deploy({
		// 	data: '0x' + hospitals.evm.bytecode.object,
		// 	arguments: ['0x6666E59DFbF51753C42a720E23fde07f9189626F','0x1B1386Fb5dD168eBf22D7CAF38D9254E35064Df0']
		// })
		// .send({
		// 	from: accounts[0],
		// 	gas: '2000000'
		// });

		// //deploy request
		// const RequestdeployedContract = await new web3.eth.Contract(request.abi)
		// .deploy({
		// 	data: '0x' + request.evm.bytecode.object,
		
		// })
		// .send({
		// 	from: accounts[0],
		// 	gas: '2000000'
		// });

		// //deploy user
		// const UserdeployedContract = await new web3.eth.Contract(user.abi)
		// .deploy({
		// 	data: '0x' + user.evm.bytecode.object,
		
		// })
		// .send({
		// 	from: accounts[0],
		// 	gas: '2000000'
		// });


	// console.log(
	// 	`Admin Contract deployed at address: ${AdmindeployedContract.options.address}`
	// );
	// console.log(
	// 	`Approvers Contract deployed at address: ${approversdeployedContract.options.address}`
	// );
	console.log(
		`DonationSystem Contract deployed at address: ${DonationSystemdeployedContract.options.address}`
	);
	// console.log(
	// 	`Hospital Contract deployed at address: ${HospitaldeployedContract.options.address}`
	// );
	// console.log(
	// 	`Hospitals Contract deployed at address: ${HospitalsdeployedContract.options.address}`
	// );
	// console.log(
	// 	`Request Contract deployed at address: ${RequestdeployedContract.options.address}`
	// );
	// console.log(
	// 	`User Contract deployed at address: ${UserdeployedContract.options.address}`
	// );

	provider.engine.stop();
})();

// Deploye  
