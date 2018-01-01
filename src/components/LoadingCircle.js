import React, { Component } from 'react';


class LoadingCircle extends Component {

    render() {

        return (
            <div className='center-align mt-4 pt-4 animated fadeIn' style={{ minHeight: '100vh' }}>

                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default LoadingCircle