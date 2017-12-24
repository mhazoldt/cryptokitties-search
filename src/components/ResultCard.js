
import React, { Component } from 'react';
import { Card, CardTitle, Collection, CollectionItem, Icon } from 'react-materialize'
import colors from '../data/colors'
import { connect } from 'react-redux'


class ResultCard extends Component {

    render() {

        let kitty = this.props.ckData

        let kittyBackground = ''
        let cardTextColor = ''
        let colorFound = false

        Object.keys(colors).forEach((color) => {
            if (kitty.color === color) {
                kittyBackground = colors[color].hsl
                cardTextColor = colors[color].text
                colorFound = true
            }
        })

        if (!colorFound) {
            kittyBackground = 'white'
        }

        let microEther = ''
        let formattedTime
        let displayPrice
        let ethPrice

        if (kitty.auction.id) {
            let end_time = parseInt(kitty.auction.end_time)
            let current_time = new Date()
            current_time = current_time.getTime()
            let remaining_time = end_time - current_time
            let remaining_seconds = remaining_time / 1000
            let remaining_minutes = remaining_seconds / 60
            let remaining_hours = remaining_minutes / 60
            let remaining_day = remaining_hours / 24
            let hours_remainder = remaining_hours % 24
            let remaining_year = remaining_day / 365

            let addCommas = (number) => {
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            if (remaining_hours < 0) {
                formattedTime = ''

            } else if (remaining_day > 999) {
                formattedTime = addCommas(parseInt(remaining_year)) + 'y'

            } else if (remaining_hours > 24) {
                formattedTime = addCommas(parseInt(remaining_day)) + 'd ' + parseInt(hours_remainder).toString() + 'h'

            } else {
                formattedTime = parseInt(remaining_hours).toString() + 'h'
            }


            let current_price = kitty.auction.current_price

            let petaEther_price = current_price / 1000000000000000000000000000000000
            let teraEther_price = current_price / 1000000000000000000000000000000
            let gigaEther_price = current_price / 1000000000000000000000000000
            let megaEther_price = current_price / 1000000000000000000000000
            let ether_price = current_price / 1000000000000000000
            let microEther_price = current_price / 1000000000000
            let significant_price = current_price / 100000000000000
            

            let priceUSD = parseInt(ether_price * this.props.ethPrice)

            if(priceUSD  > 999999) {
                priceUSD = `$${parseInt(priceUSD / 1000000)}million`
            } else {
                priceUSD = `$${priceUSD}`
            }

            petaEther_price = parseInt(petaEther_price)
            teraEther_price = parseInt(teraEther_price)
            gigaEther_price = parseInt(gigaEther_price)
            megaEther_price = parseInt(megaEther_price)
            ether_price = parseInt(ether_price)
            microEther_price = parseInt(microEther_price)

            console.log("price_data", current_price)
            console.log("significant_price", significant_price)
            console.log("petaEther", petaEther_price)
            console.log("teraEther", teraEther_price)
            console.log("gigaEther", gigaEther_price)
            console.log("megaEther", megaEther_price)
            console.log("ether_price", ether_price)
            console.log("mircoEther", microEther_price)

            let priceIcon
            

            if(kitty.auction.type === 'sale') {
                priceIcon = 'local_offer'
            } else if(kitty.auction.type === 'sire') {
                priceIcon = 'child_friendly'
            }

            if(gigaEther_price > 999999) {
                displayPrice = <span><i className="material-icons mr-1">{priceIcon}</i>{addCommas(petaEther_price) + 'p'}</span>
                console.log("######>>>>>>>> PRICE ADJUSTMENT", displayPrice)
            } else if(megaEther_price > 999999) {
                displayPrice = <span><i className="material-icons mr-1">{priceIcon}</i>{addCommas(gigaEther_price) + 'g'}</span>
                console.log("######>>>>>>>> PRICE ADJUSTMENT", displayPrice)
            } else if (ether_price > 999999) {
                displayPrice = <span><i className="material-icons mr-1">{priceIcon}</i>{addCommas(megaEther_price) + 'm'}</span>
                console.log("######>>>>>>>> PRICE ADJUSTMENT", displayPrice)
            } else if (microEther_price > 999999) {
                ethPrice = 'price: ' + addCommas(ether_price) + 'eth'
                displayPrice = <span><i className="material-icons mr-1">{priceIcon}</i>{priceUSD}</span>
                console.log("######>>>>>>>> PRICE ADJUSTMENT", displayPrice)
            } else {
                ethPrice = 'price: ' + addCommas(microEther_price) + 'μ'
                displayPrice = <span><i className="material-icons mr-1">{priceIcon}</i>{priceUSD}</span>
            }

        } 
        
        let image_url

        if (kitty.image_url === null && kitty.generation === 0) {
            image_url = 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/1.png'
        } else {
            image_url = kitty.image_url
        }

        let cardHeader = (
            <CardTitle reveal image={image_url} style={{ background: kittyBackground }}>
                <div className='image-text-positioning activator' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className='truncate name-font' style={{ width: '100%', color: cardTextColor }}>
                        {kitty.name}
                    </div>

                    <div style={{ alignSelf: 'flex-end', width: '100%' }}>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>

                            <span className='image-text' style={{ color: cardTextColor }}>{displayPrice}</span>
                            <span className='image-text' style={{ color: cardTextColor }}>{formattedTime}</span>
                        </div>
                    </div>
                </div>
                <a className="btn-floating halfway-fab waves-effect waves-light white" target="blank" href={`https://www.cryptokitties.co/kitty/${kitty.id}`}><i className="material-icons" style={{ color: 'black' }}>link</i></a>
            </CardTitle>
        )

        // console.log("cattributes", kitty.cattributes)

        let cat = {}
        let firstColor = true

        kitty.cattributes.forEach((cattribute) => {
            if (cattribute.type === "color" && firstColor) {
                cat.color1 = cattribute.description
                firstColor = false

            } else if (cattribute.type === "color") {
                cat.color2 = cattribute.description

            } else {
                cat[cattribute.type] = cattribute.description

            }

        });

        if (kitty.is_fancy) {
            cat = {
                color1: 'Fancy ' + kitty.fancy_type,
                color2: 'Fancy ' + kitty.fancy_type,
                colorbody: '',
                body: 'Fancy ' + kitty.fancy_type,
                coloreyes: '',
                eyes: 'Fancy ' + kitty.fancy_type,
                pattern: 'Fancy ' + kitty.fancy_type,
                mouth: 'Fancy ' + kitty.fancy_type
            }

        }

        if (kitty.image_url === null && kitty.generation === 0) {
            cat = {
                color1: 'New Gen 0',
                color2: 'New Gen 0',
                colorbody: '',
                body: 'New Gen 0',
                coloreyes: '',
                eyes: 'New Gen 0',
                pattern: 'New Gen 0',
                mouth: 'New Gen 0'
            }

        }

        let cooldowns = ['Fast', 'Swift', 'Snappy', 'Brisk', 'Plodding', 'Slow', 'Sluggish', 'Catatonic']
        let cooldown_index = kitty.status.cooldown_index
        let cooldown = cooldowns[cooldown_index]

        let created_at = new Date(kitty.created_at)
        created_at = created_at.toDateString()


        return (
            <div className='col s12 m6 l4 xl3'>

                {this.props.cardAnimation === 'intro' &&

                    <Card className='hoverable animated bounceInRight' style={{ backgroundColor: kittyBackground }} header={cardHeader} reveal={<div><h4>Bio</h4><p>{kitty.bio}</p><p>created: {created_at}</p><p>{ethPrice}</p></div>} key={kitty.id}>
                        <Collection>
                            <CollectionItem className='truncate' style={{ backgroundColor: kittyBackground, color: cardTextColor }}> <Icon left={true} className='icon-margin'>color_lens</Icon> <span className='cattribute-text'>{cat.color1}</span></CollectionItem>
                            <CollectionItem className='truncate' style={{ backgroundColor: kittyBackground, color: cardTextColor }}> <Icon left={true} className='icon-margin'>color_lens</Icon> <span className='cattribute-text'> {cat.color2} </span></CollectionItem>
                            <CollectionItem className='truncate' style={{ backgroundColor: kittyBackground, color: cardTextColor }}> <Icon left={true} className='icon-margin'>accessibility</Icon>  <span className='cattribute-text'> {cat.colorbody} {cat.body} </span></CollectionItem>
                            <CollectionItem className='truncate' style={{ backgroundColor: kittyBackground, color: cardTextColor }}> <Icon left={true} className='icon-margin'>visibility</Icon>  <span className='cattribute-text'> {cat.coloreyes} {cat.eyes} </span></CollectionItem>
                            <CollectionItem className='truncate' style={{ backgroundColor: kittyBackground, color: cardTextColor }}> <Icon left={true} className='icon-margin'>fingerprint</Icon>  <span className='cattribute-text'> {cat.pattern} </span></CollectionItem>
                            <CollectionItem className='truncate' style={{ backgroundColor: kittyBackground, color: cardTextColor }}> <Icon left={true} className='icon-margin'>insert_emoticon</Icon>  <span className='cattribute-text'> {cat.mouth} </span></CollectionItem>
                        </Collection>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            <span className='cattribute-text' style={{ color: cardTextColor, marginLeft: '15px' }}>#{kitty.id}</span>
                            <span className='cattribute-text' style={{ color: '#9e9e9e' }}>{cooldown}</span>
                            <span className='cattribute-text' style={{ color: cardTextColor, marginRight: '15px' }}>Gen. {kitty.generation}</span>
                        </div>

                    </Card>
                }
                {this.props.cardAnimation === 'outro' &&

                    <Card className='hoverable animated bounceOutLeft' style={{ backgroundColor: kittyBackground }} header={cardHeader} reveal={<div><h4>Bio</h4><p>{kitty.bio}</p>created: {created_at}</div>} key={kitty.id}>
                        <Collection>
                            <CollectionItem className='truncate' style={{ backgroundColor: kittyBackground, color: cardTextColor }}> <Icon left={true} className='icon-margin'>color_lens</Icon> <span className='cattribute-text'>{cat.color1}</span></CollectionItem>
                            <CollectionItem className='truncate' style={{ backgroundColor: kittyBackground, color: cardTextColor }}> <Icon left={true} className='icon-margin'>color_lens</Icon> <span className='cattribute-text'> {cat.color2} </span></CollectionItem>
                            <CollectionItem className='truncate' style={{ backgroundColor: kittyBackground, color: cardTextColor }}> <Icon left={true} className='icon-margin'>accessibility</Icon>  <span className='cattribute-text'> {cat.colorbody} {cat.body} </span></CollectionItem>
                            <CollectionItem className='truncate' style={{ backgroundColor: kittyBackground, color: cardTextColor }}> <Icon left={true} className='icon-margin'>visibility</Icon>  <span className='cattribute-text'> {cat.coloreyes} {cat.eyes} </span></CollectionItem>
                            <CollectionItem className='truncate' style={{ backgroundColor: kittyBackground, color: cardTextColor }}> <Icon left={true} className='icon-margin'>fingerprint</Icon>  <span className='cattribute-text'> {cat.pattern} </span></CollectionItem>
                            <CollectionItem className='truncate' style={{ backgroundColor: kittyBackground, color: cardTextColor }}> <Icon left={true} className='icon-margin'>insert_emoticon</Icon>  <span className='cattribute-text'> {cat.mouth} </span></CollectionItem>
                        </Collection>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            <span className='cattribute-text' style={{ color: cardTextColor, marginLeft: '15px' }}>#{kitty.id}</span>
                            <span className='cattribute-text' style={{ color: '#9e9e9e' }}>{cooldown}</span>
                            <span className='cattribute-text' style={{ color: cardTextColor, marginRight: '15px' }}>Gen. {kitty.generation}</span>
                        </div>

                    </Card>
                }

            </div>

        )
    }
}


function mapStateToProps(appState) {
    if (appState.salesPage.active  === 'sale') {
        return {
            cardAnimation: appState.salesPage.cardAnimation,
            ethPrice: appState.baseLayout.ethPrice
        }
    } else if (appState.sirePage.active  === 'sire') {
        return {
            cardAnimation: appState.sirePage.cardAnimation,
            ethPrice: appState.baseLayout.ethPrice
        }
    } else if (appState.allPage.active  === 'all') {
        return {
            cardAnimation: appState.allPage.cardAnimation,
            ethPrice: appState.baseLayout.ethPrice
        }
    } 
}


export default connect(mapStateToProps)(ResultCard);