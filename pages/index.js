import React, { Component } from 'react';
import { Card, Button, Segment, Grid, Image, Label, List, Divider } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Campaign from '../ethereum/campaign';
import Layout from '../components/Layout';
import { Link } from '../routes';
import TabCategory from '../components/Home/TabCategory';
import userFactory from '../ethereum/user';

class CampaignIndex extends Component {
    // static async getInitialProps() {
    //     const campaigns = await factory.methods.getDeployedCampaign('art').call();
    //     return { campaigns };
    // }

    // renderCampaigns() {
    //     const items = this.props.campaigns.map((address, i) => {
    //         return {
    //             header: address,
    //             description: (
    //                 <Link route={`/campaigns/${address}`}>
    //                     <a>{this.props.campaigns[i].methods}</a>
    //                 </Link>
    //             ),
    //             fluid: true
    //         }
    //     });

    //     return <Card.Group items={items} />;
    // }

    state = {
        totalBackers : '',
        totalCampaigns : '',
        funded : '',
        lived : ''
    }

    async componentDidMount() {
        let totalBackers = await userFactory.methods.getTotalBackers().call()
        let totalCampaigns = await factory.methods.campaignsCount().call()
        
        let funded = 0

        await Promise.all(
            Array(parseInt(totalCampaigns)).fill().map( async(element, index) => {
                let address = await factory.methods.campaignsAddress(index).call()
                let campaign = Campaign(address)
                let isFunded = await campaign.methods.isFunded().call()
                if (isFunded == true) {
                    funded++
                } 
            })
        );

        let lived = totalCampaigns - funded
        this.setState({totalBackers, totalCampaigns, funded, lived})
    }

    render() {
        return (
            <div>
                <Layout>
                    <Grid columns='three' divided>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <List>
                                    <List.Item>
                                    </List.Item>
                                    <List.Item>
                                        Bringing creative projects to life.
                                    </List.Item>
                                </List>
                            </Grid.Column>

                            <Grid.Column width={4}>
                                <List>
                                    <List.Item>
                                        TOTAL BACKERS
                                    </List.Item>
                                    <List.Item>
                                        {this.state.totalBackers}
                                    </List.Item>
                                </List>
                            </Grid.Column>

                            <Grid.Column width={4}>
                                <List>
                                    <List.Item>
                                        FUNDED PROJECTS
                                    </List.Item>
                                    <List.Item>
                                        {this.state.funded}
                                    </List.Item>
                                </List>
                            </Grid.Column>

                            <Grid.Column width={4}>
                                <List>
                                    <List.Item>
                                        LIVE PROJECTS
                                    </List.Item>
                                    <List.Item>
                                        {this.state.lived}
                                    </List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Divider />

                    <TabCategory />
                    {/* <h3>Open Campaigns</h3>
                    <Link route="/campaigns/new">
                        <a>
                            <Button
                            floated="right"
                            content="Create Campaign"
                            icon="add circle"
                            primary
                            />
                        </a>
                    </Link> */}
                    {/* {this.renderCampaigns()} */}
                </Layout>
            </div>
        );

    }
}

export default CampaignIndex;