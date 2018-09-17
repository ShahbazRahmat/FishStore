import React, { Component } from 'react';
import PropTypes from 'prop-types';


class AddFishForm extends Component
{
    
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    static propTypes = {
        AddFish: PropTypes.func
    };

    createFish = event => { 
        event.preventDefault();
        const fish = {
            name : this.nameRef.value.value,
            price: parseFloat(this.priceRef.value.value),
            status: this.statusRef.value.value,
            desc: this.descRef.value.value,
            image: this.imageRef.value.value
        };
        // Destructuring of the props
        const { addFish } = this.props;
        debugger;
        addFish(fish);
        event.currentTarget.reset();
    }

    render()
    {
        return (
            <form className="fish-edit" onSubmit={this.createFish}>
                <input  name="name" ref={this.nameRef} type="text" placeholder="Name" />
                <input type="text" name="price" ref={this.priceRef} placeholder="Price" />
                <select type="text" ref={this.statusRef}>
                    <option value="avaiable">Fresh!</option>
                    <option value="unavaiable">Sale Out!!</option>
                </select>
                <textarea type="text" name="desc" ref={this.descRef} placeholder="Desc" />
                <input type="text" name="image" ref={this.imageRef} placeholder="Image" />
                <button type="submit">+ Add Fish</button>
            </form>
        )
    }
}

export default AddFishForm;