import web3 from './web3';
import UserFactory from './build/UserFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(UserFactory.interface),
    '0x9390f4b942B8c1D7a9dB782B9c94e18AcAC294e5'
);

export default instance;