import React, { Component } from "react";
import Axios from "axios";
import Joke from "./Joke";

class JokeList2 extends React.Component{

    constructor({numJokesToGet}){
        super(numJokesToGet);
        this.state = {jokes:[], numJokesToGet};
        this.getJokes = this.getJokes.bind(this);
        this.generateNewJokes = this.generateNewJokes.bind(this);
        this.vote = this.vote.bind(this);
    }

    componentDidMount(){
        this.getJokes();
    }


    async getJokes(){
        let seenJokes = new Set();
        let j = [...this.state.jokes];
        try{
            
            while(j.length < this.state.numJokesToGet){
                let res = await Axios.get("https://icanhazdadjoke.com", {
                    headers: { Accept: "application/json" }
                });
                let { status, ...jokeObj } = res.data;
                
                if(!seenJokes.has(jokeObj.id)){
                    seenJokes.add(jokeObj.id);
                    j.push({...jokeObj, votes:0});
                    
                } else{
                    console.log('duplicate found!');
                }
            }
            ///this line is key for the app to work updates the state with the new jokes array
            this.setState({jokes: j}); 
        } catch (e){
            console.log(e);
        }
    
    }

    generateNewJokes() {
        this.setState({ jokes: [] }, () => {
          this.getJokes();
        });
      }
      
    

    vote(id, delta){
        let allJokes = this.state.jokes;
        allJokes = allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j));
        this.setState({jokes: allJokes});
    }

    render(){
        const jokes = this.state.jokes;

        return (
            <div className="JokeList">  
                <button className="JokeList-getmore" onClick={this.generateNewJokes}>
                    Get new jokes!
                </button>
                {jokes.map(j => (
                <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
                ))}                    
            </div>
          )
    }
}

export default JokeList2;