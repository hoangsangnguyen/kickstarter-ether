import Web3 from 'web3';

let web3;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // We are in the brower and metamask is running
    web3 = new Web3(window.web3.currentProvider);
} else {
    // We are on the server * OR * the user is not runnign metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/377c254527214dfdbf80548a7e8dcfb5'
    );
    web3 = new Web3(provider);
    
}
export default web3;