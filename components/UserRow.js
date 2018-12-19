import React, {Component} from 'react';
import {Table, Button, Image} from 'semantic-ui-react';
import web3 from '../ethereum/web3';

class UserRow extends Component {
    render(){
        const {Row, Cell} = Table
        const {avatar, email, userName} = this.props

        return (
            <Row>
                <Cell><Image src='https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png' size='tiny' avatar /></Cell>
                <Cell>{email}</Cell>
                <Cell>{userName}</Cell>
            </Row>
        );
    }
}

export default UserRow;