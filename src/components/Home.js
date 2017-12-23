
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Icon } from 'react-materialize'

class Home extends Component {



    render() {

        return (
            <div class="row">
                <div class="col s12">
                    <div class="card mt-4">
                        <div class="card-content">

                            <p>
                                This is a front end to search for CryptoKitties. It is suppose to make searching more convenient by just pushing buttons.
                            </p>

                            <p className='mt-2'>
                                The search inputs are automatically updated as new cattributes are available.
                            </p>

                            <p className='mt-3'>
                                Prices are listed in different denominations of Ether. microEther, Ether, megaEther, gigaEther, and petaEther.
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
                                <img style={{width: '200px'}} 
                                src='https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/1.png' />
                            </p>
                            <p className='mt-2'>
                                The link on these cards will still work.
                            </p>

                        </div>
                        <div class="card-action">
                            <a href="https://github.com/mhazoldt/cryptokitties-search" target='blank'>GitHub</a>
                            <a href="https://freewallet.org/id/92986def/lsk" target='blank'>Donation</a>
                        </div>
                    </div>
                </div>

                <div class="col s12">
                    <div class="card mt-4">
                        <div class="card-content">

                            <p>
                                <NavLink to='/sale' activeClassName=''><Icon left={true}>local_offer</Icon>Search Sale</NavLink>
                            </p>

                        </div>
                    </div>
                </div>

                <div class="col s12">
                    <div class="card mt-4">
                        <div class="card-content">

                            <p>
                                <NavLink to='/sire' activeClassName=''><Icon left={true}>child_friendly</Icon>Search Sire</NavLink>
                            </p>

                        </div>
                    </div>
                </div>

                <div class="col s12">
                    <div class="card mt-4">
                        <div class="card-content">

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

export default Home;