import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x3602631dC72312Be80f8DF1566d24cFb7Eb3e03F'
);

export default instance;