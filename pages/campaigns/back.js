import React, { Component } from 'react';
import { Button, Form, Input, Message, Checkbox, FormGroup, Dropdown, Container, Embed, TextArea, GridRow, GridColumn, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';
import Campaign from '../../ethereum/campaign';
import { Router } from '../../routes';

class BackCampaign extends Component {
    state = {
        amount: '',
        loading: false,
        errorMessage: '',
        title  : '',
    }

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        console.log('Account : ', accounts)

        const campaign = Campaign(this.props.url.query.address)
        const title = await campaign.methods.mTitle().call();
        this.setState({title})

    }

    onSubmit = async (event) => {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"))
        if (user == null) {
            Router.pushRoute("/author/login")
            return
        }
        this.setState({ loading: true, errorMessage: '' });

        try {
            const userWalletAddress = user.walletAddress
            console.log("User walletAdress : ", userWalletAddress)

            const campaign = Campaign(this.props.url.query.address)

            console.log('campaign : ' + campaign);
            console.log('Amount back : ', this.state.amount)

            await campaign.methods
                .contribute()
                .send({
                    value: web3.utils.toWei(this.state.amount, 'ether'),
                    from: userWalletAddress
                });

            Router.pushRoute(`/campaigns/${this.props.url.query.address}`);

        } catch (err) {
            console.log(err.message);
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });

    };

    render() {
        console.log('Address ', this.props.url.query.address)

        return (
            <Layout>
                <Grid>
                    <GridRow columns={2}>
                        <GridColumn width={5}>
                            <Link route={`/campaigns/${this.props.url.query.address}`}>
                                <a>
                                    <Button basic content='Return' icon='left arrow' labelPosition='left' />
                                </a>
                            </Link>
                        </GridColumn>

                        <GridColumn width={7}>
                            <h3 style={{ textAlign: 'center' }}>{this.state.title}</h3>
                        </GridColumn>
                    </GridRow>

                </Grid>


                <Form className="segment" onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Amount</label>
                        <Input
                            label="ether"
                            labelPosition="right"
                            value={this.state.amount}
                            onChange={event =>
                                this.setState({ amount: event.target.value })}
                        />
                    </Form.Field>

                    <Message error header="Oops!" content={this.state.errorMessage} />

                    <Button primary loading={this.state.loading}>Back to this campaign</Button>
                </Form>
            </Layout>
        );
    }
}

export default BackCampaign;