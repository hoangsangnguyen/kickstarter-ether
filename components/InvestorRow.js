import React, {Component} from 'react';
import {Table, Button, Image} from 'semantic-ui-react';
import web3 from '../ethereum/web3';

class InvestorRow extends Component {
    render(){
        const {Row, Cell} = Table
        const {avatar, userName, address, amount} = this.props

        return (
            <Row>
                <Cell><Image src='https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png' size='tiny' avatar /></Cell>
                <Cell>{userName}</Cell>
                <Cell>{address}</Cell>
                <Cell>{amount}</Cell>
            </Row>
        );
    }
}

export default InvestorRow;