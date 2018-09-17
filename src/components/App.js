import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './store/Header';
import Inventory from './inventory/Inventory';
import Order from '../components/order/Order';
import sampleFishes from '../sample-fishes';
import Fish from './store/Fish';
import base from '../base';


class App extends Component
{
    state = {
        fishes: {},
        order: {}
    };
    static propTypes ={
        fish: PropTypes.shape({
            name: PropTypes.string,
            image: PropTypes.string,
            desc: PropTypes.string,
            price: PropTypes.number,
            status: PropTypes.string
        }),
        index: PropTypes.string,
        updateFish: PropTypes.func
    }

    componentDidMount()
    {
        const  { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef)
        {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, { 
            context: this,
            state: 'fishes'
        });
    }
    componentDidUpdate()
    {
        console.log(this.state.order);
        const { match } = this.props;
        localStorage.setItem(match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount()
    {
        base.removeBinding(this.ref);
    }

    addFish = fish =>
    {
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({ fishes });

    };

    updateFish = (key, updatedFish) =>
    {
        
        const fishes = { ...this.state.fishes };
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }

    deleteFish = (key) =>
    {
        // const fishes = { ...this.state.fishes };
        // const test = Object.keys(fishes);
        // return fishes !== fishes[key];

        // fishes[key] = null;
        debugger;
        const {fishes}=this.state;
        const newFishes = Object.values(fishes);
        const filteredFish=newFishes.filter((fish) => {
            return fish.name !== key
        })

        this.setState({ fishes: filteredFish });

    }

    loadSampleFishes = () => 
    {
        this.setState({ fishes: sampleFishes });
    }

    addToOrder = (key) => {
        // 1. take a copy of state
        const order = { ...this.state.order };
        // 2. Either add to the order, or update the number in our order
        order[key] = order[key] + 1 || 1;
        // 3. add or update the state
        this.setState({ order });
    }

    removeFromOrder = key =>
    {
        // 1. take a copy of state
        const order = { ...this.state.order };
        // 2. Remove that item from order
        delete order[key];
        // 3. add or update the state
        this.setState({ order });
    }

    render()
    {
        // export const InventoryProps = ({ addFish, updateFish, deleteFish, loadSampleFishes, fishes, storeId}) => (
        //     <Inventory InventoryProps = {addFish} updateFish={updateFish} deleteFish={deleteFish} loadSampleFishes={loadSampleFishes} fishes={state.fishes} storeId={props.match.params.storeId} />
        // );
        const {fishes} = this.state;
        const {storeId} = this.props.match.params;
        return(
          <div className="catch-of-the-day"> 
            <div className="menu">
                <Header tagline="Fresh seafood market" />
                <ul>
                  {Object.keys(fishes).map(key => 
                    <Fish key={key} 
                    index={key} 
                    details={fishes[key]} 
                    addToOrder={this.addToOrder} />)}
                </ul>
            </div>
           <Order fishes={this.state.fishes} 
           order={this.state.order} 
           removeFromOrder={this.removeFromOrder}/> 
        
           <Inventory addFish={this.addFish} 
           updateFish={this.updateFish} 
           deleteFish={this.deleteFish} 
           loadSampleFishes={this.loadSampleFishes} 
           fishes={this.state.fishes}
           storeId={storeId}
        />
          </div>
        )
    }
}

export default App;