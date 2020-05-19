import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        return (
            <StripeCheckout 
                name="Emaily"
                description="$5 for emails creddits"
                amount={500} //specify the amount of the payments (in cents)
                token={token => this.props.handleToken(token)} // callback function after successfully receive the api
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    ADD CREDITS
                </button>
            </StripeCheckout>
        )
    }
}

export default connect(null, actions)(Payments);