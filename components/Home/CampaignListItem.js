import React from 'react';
import { Card, Grid, Image, Icon, Item, Container, Divider } from 'semantic-ui-react';
import { Link } from '../../routes';

const CampaignListItem = (campaign) => {
    const imageUrl = 'https://ethereum.org/images/wallpaper-homestead.jpg';
    return (
        <Container>
            <Item.Group>
                <Item>
                    <Item.Image size='small' src={imageUrl} />

                    <Item.Content>
                        <Item.Header>Arrowhead Valley Camp</Item.Header>
                        <Item.Meta>
                            <span className='price'>$1200</span>
                            <span className='stay'>1 Month</span>
                        </Item.Meta>
                        <Item.Description>Matthew is a musician living in Nashville.</Item.Description>
                        <Item.Extra>
                            <Icon color='green' name='check' /> 121 Votes
                    </Item.Extra>
                    </Item.Content>
                </Item>
            </Item.Group >
            <Divider />

        </Container>

    );

};

export default CampaignListItem;