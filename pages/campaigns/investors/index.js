import React, {Component} from 'react';
import { Container, Image, Grid, Card, Icon, List, Table } from 'semantic-ui-react';
import {Router, Link} from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import { request } from 'https';
import web3 from '../../../ethereum/web3';
import InvestorRow from '../../../components/InvestorRow';

class Investors extends Component {
    state = {
        investors : []
    }

    async componentDidMount() {
        const campaign = Campaign(this.props.url.query.address)
        const investorAddress = await campaign.methods.getInvestorsAddress().call();
        console.log('investors address ' , investorAddress);

        let investorInfos = await investorAddress.map(async (address, i) => {
            console.log('Address ', address );
            let amount = await campaign.methods.getInvestorAmount(address).call();
            return {
                address: address,
                amount: web3.utils.fromWei(amount, 'ether')
            }
        });

        Promise.all(investorInfos).then((completed) => {
            this.setState({ investors: completed });
        });

    }

    renderRow(){
        if (this.state.investors.length > 0) {
            return this.state.investors.map((address, amount, index) => {
                return (
                <InvestorRow
                    key={index}
                    avatar="abc"
                    address = {address}
                    amount = {amount}
                    />
                );
            });
        }
       
    }

    render(){
        const {Header, Row, HeaderCell, Body} = Table;
        return (
            <Layout>
                <h3>Investors List</h3>
                
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>Avatar</HeaderCell>
                            <HeaderCell>Address</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
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

export default Investors;