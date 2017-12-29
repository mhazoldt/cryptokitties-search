import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from './Header';
import PageFooter from './PageFooter';
import { withRouter } from 'react-router'

import {
    getAllCattributes,
    getEthPrice
} from '../redux/BaseLayout/actionCreators'


class BaseLayout extends Component {

    componentWillMount() {
        this.props.dispatch(getEthPrice())
        this.props.dispatch(getAllCattributes())
    }

    render() {
        return (
            <div className="navbar-container"  style={{height: '100vh'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', margin: '0 auto'}}>
                    <div>
                        <Header />
                    
                        {this.props.children}
                    </div>
                    <PageFooter />
                </div>
            </div>
        )
    }
}


export default withRouter(connect(null)(BaseLayout))