import React, { Component } from 'react';
import { Container, Image, Grid, Card, Icon, List, Table } from 'semantic-ui-react';
import { Link } from '../../routes';
import Layout from '../../components/Layout';
import userFactory from '../../ethereum/user';
import { Router } from '../../routes';
import UserRow from '../../components/UserRow';

class User extends Component {
    state = {
        users: []
    };

    async componentDidMount() {
        let usersCount = await userFactory.methods.getTotalBackers().call();
        console.log('Users count : ' + usersCount)
        const users = await Promise.all(
            Array(parseInt(usersCount)).fill().map((element, index) => {
                return userFactory.methods.usersInfo(index).call()
            })
        );

        this.setState({users})

    }

    renderRow(){
        return this.state.users.map((user, index) => {
            return (
            <UserRow
                key={index}
                avatar="abc"
                email={user.email}
                userName={user.userName}
                />
            );
        });
    }

    render(){
        const {Header, Row, HeaderCell, Body} = Table;

        return (
            <Layout>
                <h3>Users List</h3>
                
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>Avatar</HeaderCell>
                            <HeaderCell>Email</HeaderCell>
                            <HeaderCell>Username</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>

                {/* <div>Found {this.state.requestCount} request.</div> */}
            </Layout>
        );
    }
}

export default User;