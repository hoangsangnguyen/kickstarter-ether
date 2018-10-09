import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Container } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import userFactory from '../../ethereum/user';
import Head from 'next/head';
import { Router } from '../../routes';

class SignUp extends Component {
    state = {
        errorMessage: '',
        loading: '',
        email: '',
        userName: '',
        password: '',
        confirmPassword: '',
        walletAddress: ''
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' })
        if (this.state.password != this.state.confirmPassword) {
            console.log('Password confirm wrong')
            return
        }

        console.log('State ', this.state)
        console.log('Email : ', this.state.email)
        console.log('userName : ', this.state.userName)
        console.log('Password : ', this.state.password)
        console.log('Wallet address : ', this.state.walletAddress)

        try {

            let result = await userFactory.methods.createUser(this.state.email, this.state.userName, this.state.password, this.state.walletAddress)
                .send({
                    from: this.state.walletAddress
                });

            Router.pushRoute('/author/login')
            console.log('Sign up success')

        } catch (err) {
            console.log('Error sign up ', err.message)
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false })
    }

    render() {
        return (
            <Container>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
                </Head>
                <div >
                    {/*
                    Heads up! The styles below are necessary for the correct render of this example.
                    You can do same with CSS, the main idea is that all the elements up to the `Grid`
                    below must have a height of 100%.
                    */}
                    <Grid textAlign='center' style={{ height: '100%',  marginTop : '20px'  }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                SignUp your account
                            </Header>
                            <Form size='large' onSubmit={this.onSubmit}>
                                <Segment>
                                    <Form.Input fluid icon='envelope' iconPosition='left' placeholder='E-mail address'
                                        value={this.state.email}
                                        onChange={event => this.setState({ email: event.target.value })} />

                                    <Form.Input fluid icon='user' iconPosition='left' placeholder='User name'
                                        value={this.state.userName}
                                        onChange={event => this.setState({ userName: event.target.value })} />

                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Password'
                                        type='password'
                                        value={this.state.password}
                                        onChange={event => this.setState({ password: event.target.value })}
                                    />

                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Confirm password'
                                        type='password'
                                        value={this.state.confirmPassword}
                                        onChange={event => this.setState({ confirmPassword: event.target.value })}
                                    />

                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Wallet address'
                                        value={this.state.walletAddress}
                                        onChange={event => this.setState({ walletAddress: event.target.value })}
                                    />

                                    <Message error header="Oops!" content={this.state.errorMessage} />
                                    <Button color='teal' fluid size='large' loading={this.loading}>
                                        SignUp
                                    </Button>
                                </Segment>
                            </Form>
                            <Message>
                                Back to login ? <a href='/author/login'>Login</a>
                            </Message>
                        </Grid.Column>
                    </Grid>
                </div>
            </Container>
        )
    }
}

export default SignUp;