import React from 'react';
import styled from 'styled-components'
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';

const LayoutContainer = styled.div`
  margin: 3px 4px;
`

const Layout = ({ children }) => (
    <LayoutContainer>
        <Header />
        <Menu />
        {children}
        <Footer />
    </LayoutContainer>
);

export default Layout