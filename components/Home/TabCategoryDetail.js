import React, { Component } from 'react';
import { Container, Image, Grid, Card, Icon } from 'semantic-ui-react';
import { Link } from '../../routes';
import factory from '../../ethereum/factory';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

class TabCategoryDetail extends Component {
    state = {
        campaigns: []
    };

    async componentWillReceiveProps(nextProps) {
        if (this.props.campaigns !== nextProps.campaigns) {
            console.log(this.props !== nextProps)

            let campaigns = await nextProps.campaigns.campaigns.map(async (address, i) => {
                const campaign = Campaign(address);
                let title = await campaign.methods.mTitle().call();
                let imageUrl = await campaign.methods.mImageFile().call();
                let backed = await campaign.methods.mBacked().call();
                let goal = await campaign.methods.mGoal().call();
                return {
                    title: title,
                    imageUrl: imageUrl,
                    address: address,
                    backed : web3.utils.fromWei(backed, 'ether'),
                    goal : web3.utils.fromWei(goal, 'ether'),
                }
            });

            Promise.all(campaigns).then((completed) => {
                this.setState({ campaigns: completed });
            });
        }

    }

    handleClick = (e) => {
        console.log('Click ', e)
    }

    renderCampaigns() {
        let items = []
        this.state.campaigns.map((campaign, i) => {
            items.push({
                image: { src: campaign.imageUrl, width: '100%', height: '200px' },
                header: campaign.title,
                extra : `Backed:  ${campaign.backed} / ${campaign.goal}`,
                href : `/campaigns/${campaign.address}`
            })
        });

        return <Card.Group items={items} itemsPerRow={3} centered />;
    }

    

    render() {
        return (
            <Container style={{ marginTop: '29px' }}>
                {this.renderCampaigns()}
            </Container>
        );
    }
}

// const TabDetail = (props) => {
//     const main = props.campaigns[props.campaigns.length - 1];
//     return (

//         <Container style={{ marginTop: '29px' }}>
//             <a style={{ fontSize: '30px' }}>{main}</a>

//             <Link route={`/`}>
//                 <a style={{ marginLeft: '20px' }}>View all</a>
//             </Link>
//             <i aria-hidden='true' class='arrow right disabled icon' />

//             <br />

//             <h5>FEATURED PROJECT</h5>

//             <Grid>
//                 <Grid.Row>
//                     <Grid.Column width={8}>
//                         <OverviewCampaign address={main} />
//                     </Grid.Column>
//                     <Grid.Column width={8}>
//                         <CampaignList />
//                     </Grid.Column>
//                 </Grid.Row>
//             </Grid>


//         </Container>
//     );
// }

// class TabDetail extends Component {

//     state = {
//         campaigns : [],
//         mainCampaign : ''

//     };


//     render() {
//         console.log('Reender campaign');
//         console.log('Index : ', this.props.campaigns);
//         let main = this.props.campaigns[this.props.campaigns.length-1];
//         console.log('Main : ', main);

//         return (

//             <Container style={{ marginTop: '29px' }}>
//                 <a style={{ fontSize: '30px' }}>{main}</a>

//                 <Link route={`/`}>
//                     <a style={{ marginLeft: '20px' }}>View all</a>
//                 </Link>
//                 <i aria-hidden='true' class='arrow right disabled icon' />

//                 <br />

//                 <h5>FEATURED PROJECT</h5>

//                 <Grid>
//                     <Grid.Row>
//                         <Grid.Column width={8}>
//                             <OverviewCampaign address = {main}/>
//                         </Grid.Column>
//                         <Grid.Column width={8}>
//                             <CampaignList />
//                         </Grid.Column>
//                     </Grid.Row>
//                 </Grid>


//             </Container>
//         );
//     }
// }

export default TabCategoryDetail;