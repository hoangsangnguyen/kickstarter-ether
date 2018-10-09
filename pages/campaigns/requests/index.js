import React, {Component} from 'react';
import {Button, Table} from 'semantic-ui-react';
import {Router, Link} from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';
import { request } from 'https';

class RequestIndex extends Component {
    state = {
        address :'',
        requests : [],
        requestCount : '',
        approversCount : '',
        userWalletAddress : '',
        manager : ''
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user == null) {
            Router.pushRoute('/author/login')
            return
        }

        this.setState({userWalletAddress : user.walletAddress})

        const address = this.props.url.query.address
        const campaign = Campaign(address)
        
      
        let requestCount = await campaign.methods.getRequestsCount().call({
            from : user.walletAddress
        });

        const approversCount = await campaign.methods.mInvestorsCount().call();

        
        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.mRequests(index).call()
            })
        );

        let manager = await campaign.methods.mManager().call();
        this.setState({address, requests, requestCount, approversCount, manager})

    }

    renderRow(){
        return this.state.requests.map((request, index) => {
            return (
            <RequestRow
                key={index}
                id={index}
                request={request}
                address={this.state.address}
                approversCount={this.state.approversCount}/>
            );
        });
    }

    render(){
        const {Header, Row, HeaderCell, Body} = Table;
        const isManager = this.state.manager != "" && this.state.userWalletAddress == this.state.manager

        return (
            <Layout>
                <h3>Request List</h3>
                {isManager ? <Link route={`/campaigns/${this.props.url.query.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{marginBottom : 10}}>Add Request</Button>
                    </a>
                </Link> : null }
                
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>

                <div>Found {this.state.requestCount} request.</div>
            </Layout>
        );
    }
}

export default RequestIndex;