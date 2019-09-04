import React, { Component } from 'react'
// import Hearder from "../Components/Header";
import axios from "axios";

export default class PlayGame extends Component {
    constructor(props){
        super(props);

        this.state = {
            game: null,
        };
    }

    getGameData = () => {
        const gameId = this.props.match.params.gameId;
        console.log(gameId);
        
        axios({
            url: `http://localhost:6996/api/game/${gameId}`,
            method: "GET"
        }).then(response => {
           this.setState({game: response.data.game});
        }).catch(error =>{
            console.log(error);
        })
    }

    updateGameData = (newGame) => {
        const gameId = this.props.match.params.gameId;
        console.log(gameId);
        
        axios({
            url: `http://localhost:6996/api/game/${gameId}`,
            method: "PUT",
            data: {
                scores:newGame.scores
            }
        }).then(response => {
           this.setState({game: response.data.game});
        }).catch(error =>{
            console.log(error);
        })
    }

    componentDidMount(){
      this.getGameData();
    }

    renderPlayerName = () => {
        const players = this.state.game.players;
        
        return players.map((item, index) => {
                return <th key={index} scope="col"> {item}</th>
            });
    }

    updatePlayerScore = (value, playerIndex, rowIndex) => {
        const newGame = this.state.game;

        newGame.scores[rowIndex][playerIndex] = value;

        // this.setState({ game: newGame });
        this.updateGameData(newGame);
    }

    renderGameRow = () => {
        const scores = this.state.game.scores;
        const players = this.state.game.players;

        return scores.map((gameRow, rowIndex)=>{
            const row = players.map((item, playerIndex)=>{
                return (
                    <th key={playerIndex} >
                        <input
                            value = { gameRow[playerIndex] }
                            type="number"
                            className="form-control"
                            onChange={(event) => {
                                const value = event.target.value;
                                this.updatePlayerScore(value, playerIndex, rowIndex)

                                
                            }}
                        />
                        
                    </th>
                )
                
            });

            return(
                <tr>
                    <th scope="row">Round {rowIndex + 1}</th>
                    {row}
                </tr>
            );
        });
    }

    addNewRow = () => {
        const newGame = this.state.game;

        newGame.scores.push([0,0,0,0]);

        this.updateGameData(newGame);
    }

    render() {

        if(!this.state.game) return "Loading....."

        return (
            <div className="my-3">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        {this.renderPlayerName()}
                        </tr>

                        <tr>
                        <th scope="col">Sum of score</th>
                        <th scope="col">0</th>
                        <th scope="col">0</th>
                        <th scope="col">0</th>
                        <th scope="col">0</th>
                        </tr>

                    </thead>
                    <tbody>
                        {this.renderGameRow()}
                    </tbody>
                </table>
                <div className="text-center">
                    <button onClick={this.addNewRow} className="btn btn-danger">Add new row</button>
                </div>
            </div>
        )
    }
}