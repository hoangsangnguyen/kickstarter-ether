import web3 from './web3';
import UserFactory from './build/UserFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(UserFactory.interface),
    '0x34da46306441d197aff4516772cA4480FE659620'
);

export default instance;