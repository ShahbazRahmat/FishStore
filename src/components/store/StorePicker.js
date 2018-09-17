import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../../helpers';


class StorePicker extends Component
{
    static propTypes ={
        history: PropTypes.object
    }

    myInput = React.createRef();

    goToStore = (event) =>
    {
        // 1. Stop the form from submitting
        event.preventDefault();

        // 2. get the text from that input
        const storeName =  this.myInput.value.value;

        // 3. Change the page to /store/whatever-they-entered
        this.props.history.push(`/store/${storeName}`);

    }

    render()
    {
        return(
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please enter A Store!</h2>
                <input type="text" required placeholder="Store Name" ref={this.myInput} defaultValue={getFunName()}></input>
                <button type="submit">Visit Store > </button>
            </form>    
        )
    }
}

export default StorePicker;