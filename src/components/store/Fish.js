import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../helpers';


class Fish extends Component
{
    static propTypes = {
        details: PropTypes.shape({
            name: PropTypes.string,
            image: PropTypes.string,
            desc: PropTypes.string,
            price: PropTypes.number,
            status: PropTypes.string
        }),
        addToOrder: PropTypes.func
    };
    render()
    {
        const { name, image, desc, price, status } = this.props.details;
        const { index, addToOrder } = this.props;
        const isAvailable = status === 'available';
        return <li className="menu-fish">
            <img src={image} alt={name} />
            <h3 className="fish-name">{name}
                <span className="price">{formatPrice(price)}</span>
            </h3> 
            <p className="fish-name">{desc}</p>
            <button disabled={!isAvailable} 
            onClick={ () => addToOrder(index) }>
            {isAvailable ? 'Add to Cart': 'Sold Out!'}
            </button>
        </li>
    }
}



export default Fish;