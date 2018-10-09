import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xeEC9ec50c876f91De7805e341cb89c6873605c47'
);

export default instance;