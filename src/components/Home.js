
import React, { Component } from 'react';


class Home extends Component {



    render() {

        return (
            <div class="row">
                <div class="col s12">
                    <div class="card mt-4">
                        <div class="card-content">
                            
                            <p>
                                This is a front end for CryptoKitties to search for CryptoKitties that are on sale.
                            </p>
                            
                            <p className='mt-2'>
                                Prices are listed in MicroEther/Szabo because I don't like all the decimal places with the normal pricing. 
                                
                            </p>
                        </div>
                        <div class="card-action">
                            <a href="https://github.com/mhazoldt/cryptokitties-search" target='blank'>GitHub</a>
                            <a href="https://freewallet.org/id/92986def/lsk" target='blank'>Donation</a>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Home;