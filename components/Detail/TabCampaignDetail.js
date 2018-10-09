import React, { Component } from 'react';
import {Container} from 'semantic-ui-react';

class TabCampaignDetail extends Component {
    state = {
        campaigns: []
    };
   
    render() {
        console.log('Value : ', this.props.info)

        return (
            <Container style={{ marginTop: '29px', marginBottom : '50px' }}>
                {this.props.info}
            </Container>
        );
    }
}
export default TabCampaignDetail;