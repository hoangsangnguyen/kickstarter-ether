import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x8BFce242FbDC2ea3173978a613d11e2d78E86060'
);

export default instance;