import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import HeaderComponent from './Header';

export default props => {
    return (
        <Container>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                <link rel="stylesheet" href="../style/style.css"></link>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
            </Head>
            <HeaderComponent />
            {props.children}
        </Container>
    );
};