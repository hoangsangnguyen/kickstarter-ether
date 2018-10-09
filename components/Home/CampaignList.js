import React, { Component } from 'react';
import { Image, Container, Button, Label } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';
import CampaignListItem from '../Home/CampaignListItem';

const CampaignList = (props) => {
    var list = [];
    for (var i = 0; i < 4; i++) {
        let campaign = { url: 'abc', name: 'def' };
        list.push(campaign);
    }

    const campaignItems = list.map((campaign) => {
        return (
            <CampaignListItem />
        );
    });

    return (
        <ul>
            {campaignItems}
            <Link route={`/`}>
                <a className="text-link">View all</a>
            </Link>
        </ul>

    );
};

export default CampaignList;