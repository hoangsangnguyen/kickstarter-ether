import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xff3b674711d3C8671BC9a1815e22935a71F587FE'
);

export default instance;