import React, { Component } from 'react';
import { Image, Container } from 'semantic-ui-react';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

// const OverviewCampaign = (props) => {
//     const campaign = Campaign(props.address);
//     console.log('Campaign in detail : ', campaign);
//     if (campaign.options.address == null)
//         return null;
//     const imageFile = campaign.methods.mImageFile().call();
//     console.log('Campaign in detail : ', imageFile);
//     return (
//         <Container>
//             <Image
//                 src={imageFile}
//                 as='a'
//                 size='big'
//                 href='http://google.com'
//                 target='_blank'
//             />

//             <br />

//             <Link route={`/`}>
//                 <a>An American Requiem</a>
//             </Link>

//             <br />

//             <Link route={`/`}>
//                 <a>BY KAREEN M.LUCAS</a>
//             </Link>
            
//             <br />

//             <Link route={`/`}>
//                 <a>37%</a>
//             </Link>

//         </Container>

//     );

// }

class OverviewCampaign extends Component {
    state = {
        imageUrl : ''
    };

    async componentDidMount(){
        const campaign = Campaign(this.props.address);
        const imageUrl = await campaign.methods.mImageFile().call();
        this.setState({imageUrl});
    }

    render() {
        console.log('Image url : ', this.state.imageUrl);
        
        return (
            <Container>
                <Image
                    src={this.state.imageUrl}
                    as='a'
                    size='big'
                    href='http://google.com'
                    target='_blank'
                />

                <br />

                <Link route={`/`}>
                    <a>An American Requiem</a>
                </Link>

                <br />

                <Link route={`/`}>
                    <a>BY KAREEN M.LUCAS</a>
                </Link>
                
                <br />

                <Link route={`/`}>
                    <a>37%</a>
                </Link>

            </Container>

        );

    }



}

export default OverviewCampaign;