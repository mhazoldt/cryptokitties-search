
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Icon } from 'react-materialize'

class Home extends Component {

    render() {

        let price
        if(this.props.ethPrice) {
            price = `$${parseInt(this.props.ethPrice, 10)}`
        }


        return (
            <div className="row">
                <div className="col s12">
                    <div className="card mt-4">
                        <div className="card-content">
                            <h5>About</h5>
                            <p>
                                This is a front end to search for CryptoKitties. It is suppose to make searching more convenient by just pushing buttons.
                            </p>

                            <p className='mt-2'>
                                The search inputs are automatically updated as new cattributes are available. New cattribute categories do require an update.
                            </p>

                            <h5 className='mt-4'>Eth Denominations</h5>
                            <p>
                                The 'reveal' on some cards (desktop only) show price in different denominations of Ether. microEther, Ether, megaEther, gigaEther, and petaEther.
                            </p>
                            <p className='mt-2'>
                                1,000,000μ = 1 Eth
                            </p>
                            <p className='mt-2'>
                                1m = 1,000,000 Eth
                            </p>
                            <p className='mt-2'>
                                1g = 1,000,000,000 Eth
                            </p>
                            <p className='mt-2'>
                                1p = 1,000,000,000,000 Eth
                            </p>
                            <p className='mt-3'>
                                Sometimes the information on new Gen 0 CryptoKitties is not available immediately so a picture of Genesis shown.
                            </p>
                            <p className='mt-2'>
                                <img alt='' style={{width: '200px'}} 
                                src='https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/1.png' />
                            </p>
                            <p className='mt-2'>
                                The link on these cards will still work.
                            </p>
                            <p className='mt-2'>
                                Current price of Eth: {price}
                            </p>
                            <h5 className='mt-4'>Cattribute Percentage's</h5>
                            <p>
                                The grey numbers next to the cattributes on the cards are the percentage of CryptoKitties that have that cattribute.
                            </p>

                        </div>
                        <div className="card-action">
                            <a href="https://github.com/mhazoldt/cryptokitties-search" target='blank'>GitHub</a>
                            <a href="https://freewallet.org/id/92986def/lsk" target='blank'>Donation</a>
                        </div>
                    </div>
                </div>

                <div className="col s12">
                    <div className="card mt-4">
                        <div className="card-content">

                            <p>
                                <NavLink to='/sale' activeClassName=''><Icon left={true}>local_offer</Icon>Search Sale</NavLink>
                            </p>

                        </div>
                    </div>
                </div>

                <div className="col s12">
                    <div className="card mt-4">
                        <div className="card-content">

                            <p>
                                <NavLink to='/sire' activeClassName=''><Icon left={true}>child_friendly</Icon>Search Sire</NavLink>
                            </p>

                        </div>
                    </div>
                </div>

                <div className="col s12">
                    <div className="card mt-4">
                        <div className="card-content">

                            <p>
                                <NavLink to='/all' activeClassName=''><Icon left={true}>pets</Icon>Search All</NavLink>
                            </p>

                        </div>
                    </div>
                </div>


            </div>

        )
    }
}


function mapStateToProps(appState) {
    return {
        ethPrice: appState.baseLayout.ethPrice
    }
}


export default connect(mapStateToProps)(Home)