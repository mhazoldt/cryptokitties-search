
import React, { Component } from 'react';


class PageFooter extends Component {
    render() {
        return (

            <footer class="page-footer" style={{paddingTop: '0px'}}>
                
                <div class="footer-copyright">
                    <div class="container">
                        CryptoKitties Search
                        <a class="grey-text text-lighten-4 right ml-3" target='blank' href="https://freewallet.org/id/92986def/lsk">Donation</a>
                        <a class="grey-text text-lighten-4 right ml-3" target='blank' href="https://github.com/mhazoldt/cryptokitties-search">GitHub</a>
                    </div>
                </div>
            </footer>

        )
    }
}

export default PageFooter;