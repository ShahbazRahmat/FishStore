import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../../base';



class Inventory extends Component
{
    static propTypes ={
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    }

    state = {
        uid: null,
        owner: null
    };

    componentDidMount()
    {
        firebase.auth().onAuthStateChanged(user => {
            if(user)
            {
                this.authHandler({ user });
            }
        })
    }

    authHandler = async authDData => 
    {
        // console.log(authDData);
        const {storeId} = this.props;
        // 1. Look up the current store in the firebase database
        const store = await base.fetch(storeId, { constex: this });
        //console.log(store);
        // 2. Claim it if there is no owner
        if(!store.owner)
        {
            // save it as our own
            await base.post(`${storeId}/owner`, {
                data: authDData.user.uid
            })
        }
        // 3. Set the state of the inventory component to reflect the current user

        this.setState({
            uid: authDData.user.uid,
            owner: store.owner || authDData.user.uid
        })
    }

    authenticate = (provider) =>
    {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };


    logout = async () =>
    {
        console.log('Logout');
        firebase.auth().signOut();
        this.setState({uid: null});
    }

    render()
    {
        const { uid, owner } = this.state;
        const {fishes, deleteFish, updateFish, addFish, loadSampleFishes} = this.props;

        const logout = <button onClick={this.logout}>Log Out!</button>
        

        if(!uid)
        {
            return <Login authenticate={this.authenticate}/>;
        }

        if(uid !== owner)
        {
            return <div>
                <p>Sorry you are not the owner of the store!</p>
                {logout}
            </div>
        }
        return (
            
            <div className="inventory" >
                <h2>Inventory</h2>
                {logout}
                {Object.keys(fishes).map(key =>(<EditFishForm key={key} index={key} fish={fishes[key]} updateFish={updateFish} deleteFish={deleteFish}/>))}
                <AddFishForm addFish={addFish}/>
                <button onClick={loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;