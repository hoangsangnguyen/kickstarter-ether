import React, { Component } from 'react';
import { Card, Button, Segment, Grid, Image, Label, List, Divider } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Campaign from '../../ethereum/campaign';
import Layout from '../../components/Layout';
import { Link } from '../../routes';
import TabCategory from '../../components/Home/TabCategory';
import userFactory from '../../ethereum/user';
import { Router } from '../../routes';
import web3 from '../../ethereum/web3';

class InvestedCampaign extends Component {
    state = {
        campaigns: []
    }

    async componentDidMount() {
        let totalCampaigns = await factory.methods.campaignsCount().call()
        let campaigns = [];
        await Promise.all(
            Array(parseInt(totalCampaigns)).fill().map(async (element, index) => {
                let address = await factory.methods.campaignsAddress(index).call()
                let campaign = Campaign(address)
                let amount = await campaign.methods.getInvestorAmount(this.props.url.query.address).call();
                console.log('Amount ', amount)
                if (amount > 0) {
                    let info = await campaign.methods.getCampaignInfo().call();
                    campaigns.push({image: info.imageUrl, 
                                    title: info.title, 
                                    address: address,
                                    backed : web3.utils.fromWei(info.backed, 'ether'),
                                    goal : web3.utils.fromWei(info.goal, 'ether')});
                }
            })
        );

        this.setState({campaigns})
    }

    renderCampaigns() {
        let items = []
        this.state.campaigns.map(({image, title, address, backed, goal}, i) => {
            items.push({
                image: { src: image, width: '100%', height: '200px' },
                header: title,
                extra : `Backed:  ${backed} / ${goal}`,
                onClick : ()=>{Router.pushRoute(`/campaigns/${address}`)},
            })
        });

        return <Card.Group items={items} itemsPerRow={3} centered />;
    }

    render() {
        return (
            <div>
                <Layout>
                    <h3>My invested campaigns</h3>
                    {this.renderCampaigns()}
                </Layout>
            </div>
        );

    }
}

export default InvestedCampaign;