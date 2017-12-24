import React, { Component } from 'react';
import Header from './Header';
import PageFooter from './PageFooter';

class BaseLayout extends Component {
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

export default BaseLayout