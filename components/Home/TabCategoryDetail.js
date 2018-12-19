import React, { Component } from 'react';
import { Container, Image, Grid, Card, Icon } from 'semantic-ui-react';
import { Link } from '../../routes';
import factory from '../../ethereum/factory';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class TabCategoryDetail extends Component {
    state = {
        campaigns: []
    };

    async componentWillReceiveProps(nextProps) {
        if (this.props.campaigns !== nextProps.campaigns) {
            let campaigns = await nextProps.campaigns.campaigns.map(async (address, i) => {
                const campaign = Campaign(address);
                let info = await campaign.methods.getDetailCampaignInfo().call();
                return {
                    title: info.title,
                    imageUrl: info.imageUrl,
                    address: address,
                    backed : web3.utils.fromWei(info.backed, 'ether'),
                    goal : web3.utils.fromWei(info.goal, 'ether'),
                }
            });

            Promise.all(campaigns).then((completed) => {
                this.setState({ campaigns: completed });
            });
        }

    }

    renderCampaigns() {
        let items = []
        this.state.campaigns.map((campaign, i) => {
            items.push({
                image: { src: campaign.imageUrl, width: '100%', height: '200px' },
                header: campaign.title,
                extra : `Backed:  ${campaign.backed} / ${campaign.goal}`,
                onClick : ()=>{Router.pushRoute(`/campaigns/${campaign.address}`)},
            })
        });

        return <Card.Group items={items} itemsPerRow={3} centered />;
    }

    

    render() {
        console.log('Render detail')
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