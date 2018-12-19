const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const compiledUserFactory = require('./build/UserFactory.json');


const provider = new HDWalletProvider(
    'naive enough inch enroll chef sick slogan strike evidence awful artefact stomach',
    'https://rinkeby.infura.io/377c254527214dfdbf80548a7e8dcfb5'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy campaign factory from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data : compiledFactory.bytecode})
        .send ({from : accounts[0], gas : '3000000'});
    
    console.log('Contract to deploy campaign factory to ', result.options.address);

};

const deployUsers = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy userFactory from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledUserFactory.interface))
        .deploy({data : compiledUserFactory.bytecode})
        .send ({from : accounts[0], gas : '3000000'});
    
    console.log('Contract to deploy users to ', result.options.address);

};

//deploy();
deployUsers();