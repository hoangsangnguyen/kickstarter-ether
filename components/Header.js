import React, { Component } from 'react';
import { Menu, Container, Search, Grid, Segment, Divider, Button, Header, Dropdown, Icon } from 'semantic-ui-react';
import { Link } from '../routes';
import { Router } from '../routes';

const options = [
    { key: 'logout', text: 'Logout', value: 'logout' },
    { key: 'profile', text: 'Profile', value: 'profile' },
]

class HeaderComponent extends Component {

    state = {
        currentUrl: '',
        userWalletAddress: '',
        userName: '',
        isLogin: false
    }

    componentDidMount() {
        this.setState({ currentUrl: window.location.pathname })
        const user = JSON.parse(localStorage.getItem("user"));
        if (user == null) {
            this.setState({userName : '', userWalletAddress : '', isLogin : ''})
        } else {
            this.setState({ userWalletAddress: user.walletAddress, userName: user.userName, isLogin: this.state.userName.trim() == "" })
        }
    }

    renderUserUI() {
        return (
            <Dropdown floating options={options} text={this.state.userName}
                onChange={(event, { value }) => {
                    if (value == 'logout') {
                        localStorage.clear()
                        Router.pushRoute('/author/login')
                    }
                }} />
        )

    }

    render() {
        const isLogin = this.state.isLogin

        return (
            <Container>
                <Grid relaxed style={{ marginTop: '10px' }}>
                    <Grid.Column width={3}>
                        {isLogin ? <Link route="/campaigns/new">
                            <a className="item" style={{ marginLeft: '20px' }} >Start a project</a>
                        </Link> : <Link route="/author/login">
                            <a className="item" style={{ marginLeft: '20px' }} >Start a project</a>
                        </Link>}
                        

                    </Grid.Column>

                    <Grid.Column width={10} style={{ textAlign: 'center' }}>
                        <Link route="/">
                            <Header as='h2' color='teal' textAlign='center'>
                                KICKSTARER
                            </Header>
                        </Link>
                    </Grid.Column>

                    <Grid.Column width={3} style={{ textAlign: 'right' }}>
                        {isLogin ?
                            (
                                this.renderUserUI()
                            ) :
                            (<Link route={`/author/login`}>
                                <a className="item" >Login</a>
                            </Link>)}

                    </Grid.Column>

                </Grid>
                <Divider />

            </Container>
        );
    }
}

export default HeaderComponent;
