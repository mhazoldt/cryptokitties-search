
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Icon, Navbar } from 'react-materialize'


class Header extends Component {
    render() {
        return (

            <Navbar brand='CryptoKitties Search' className='pl-3 page-heading' right>
                <li><NavLink to='/home' activeClassName='button-active'><Icon left={true}>home</Icon>Home</NavLink></li>
                <li><NavLink to='/sale' activeClassName=''><Icon left={true}>local_offer</Icon>Sale</NavLink></li>
            </Navbar>

        )
    }
}

export default Header;