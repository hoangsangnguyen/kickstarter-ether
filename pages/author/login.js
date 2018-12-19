import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Container } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import userFactory from '../../ethereum/user';
import Head from 'next/head';
import { Router } from '../../routes';

class Login extends Component {
    state = {
        returnUrl: '',
        email: '',
        password: '',
        errorMessage: '',
        loading: false,
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' })
        console.log('Email : ', this.state.email)
        console.log('Password : ', this.state.password)

        try {
            let result = await userFactory.methods.login(this.state.email, this.state.password).call();
            if (result["userName"].trim() == "") {
                this.setState({errorMessage : "Username or password wrong"})
            } else {
                localStorage.setItem("user", JSON.stringify(result))
                Router.pushRoute('/')
            }

        } catch (err) {
            console.log('Error login', err.message)
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false })
    }

    handRedirectSignUpClick() {
        Router.pushRoute('/author/signup')
    }

    render() {
        return (
            <Container>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
                </Head>
                <div className='login-form'>
                    <Grid textAlign='center' style={{ height: '100%', marginTop : '20px' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                Log-in to your account
                            </Header>
                            <Form size='large' onSubmit={this.onSubmit}>
                                <Segment>
                                    <Form.Input fluid icon='envelope' iconPosition='left' placeholder='E-mail address'
                                        value={this.state.email}
                                        onChange={event => this.setState({ email: event.target.value })} />

                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Password'
                                        type='password'
                                        value={this.state.password}
                                        onChange={event => this.setState({ password: event.target.value })}
                                    />

                                    <Message error header="Oops!" content={this.state.errorMessage} />

                                    <Button color='teal' fluid size='large' loading={this.state.loading}>
                                        Login
                                    </Button>
                                </Segment>
                            </Form>
                            <Message>
                                New to us? <a onClick={this.handRedirectSignUpClick}>Sign Up</a>
                            </Message>
                        </Grid.Column>
                    </Grid>
                </div>
            </Container>
        )

    }
}

export default Login;