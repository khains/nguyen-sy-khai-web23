import React, { Component } from 'react'
import axios from "axios";
// import {BrowserRouter, Route} from "react-router-dom";
// import ScoreScreen from '../Containers/ScoreScreen';

export default class CreateGame extends Component {
    state = {
        players: ["","","",""]
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const players = this.state.players;
        
        

        console.log("Submit form");

        axios({
            url: "http://localhost:6996/api/game",
            method: "POST",
            data: {
                players,
                scores: []
            }
        }).then((response) => {
            this.props.history.push(`/game/${response.data.game._id}`);
        }).catch((error) => {
            console.log(error);
        });
        
        
    }
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const players = this.state.players;

        players[name] = value;

        this.setState({players});
        
    }
    render() {
        console.log(this.state.players);
        
        
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input onChange={this.handleChange} name="0" className="form-control" placeholder="Player 1" required></input>
                    </div>
                    <div className="form-group">
                        <input onChange={this.handleChange} name="1" className="form-control" placeholder="Player 2" required></input>
                    </div>
                    <div className="form-group">
                        <input onChange={this.handleChange} name="2" className="form-control" placeholder="Player 3" required></input>
                    </div>
                    <div className="form-group">
                        <input onChange={this.handleChange} name="3" className="form-control" placeholder="Player 4" required></input>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-danger" type="submit">Create new game</button>
                    </div>
                </form>
            </div>
        )
    }
}
