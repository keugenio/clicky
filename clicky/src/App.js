import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Jumbotron from "./components/Jumbotron";
import Row from "./components/Row";
import Col from "./components/Col";
import ResetButton from "./components/ResetButton";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends: friends,
    score:0,
    total: friends.length,
    gameStatus: 'active',
    resetButtonDisplay:false,
  };

  // before anything renders, randomize the friends so each game starts with them resorted
  componentDidMount(){
    this.randomizeFriends(friends);
  }

  // after the score has been updated, check to see if game has been won which happens 
  // when score = total possible friends
  componentDidUpdate(){
    if (this.state.score === this.state.total && this.state.gameStatus === 'active'){
      alert("You won!! All friends guessed only once!");
      this.endGame();
    }
  }

  // function sets the state of the friend chosen to be "disabled" and randomizes the original friends array
  setDisabledCreateRandomOrder = id => {
     // refer to the current array of friends as a "nonRamdom" array, 
     const nonRandomFriends = this.state.friends;
     
     // fidnd index of friend to be disabled, set friend to disabled
     const disabledIndex =  nonRandomFriends.findIndex(x => x.id===id);
     nonRandomFriends[disabledIndex].status='disabled';
     nonRandomFriends[disabledIndex].font='check';
     this.setState({font:'check'});
    this.randomizeFriends(nonRandomFriends);
  }

  // function takes in friends and returns them in a random order
  randomizeFriends = (nonRandomFriends) =>{
    // create a new random array of friends by randomly splicing the nonRandom array and pushing into new random array
    const randomFriends = [];
    for (let i = this.state.total; i > 0; i--) {
      let index = Math.floor(Math.random()*i);
      randomFriends.push(nonRandomFriends[index]);
      nonRandomFriends.splice(index, 1);;
    }

    // setstate of friends to new Random array
      this.setState({friends:randomFriends});    
  }

  // function "ends" game by setting the gameStatus to "gameOver"
  endGame = () => {
    if (this.state.gameStatus === "active"){
        this.setState({gameStatus:"gameOver"});
        this.setState({opacity:.6});
        this.setState({resetButtonDisplay:true});
        alert("Game Over");
    }
  }

  // set the state of the friend as "disabled" if CHOSEN (they shouldn't be picked anymore)
  // otherwise the default is "active" and it's okay to pick them
  handleSetFriendState = (id) => {
    // refer to the current array of friends as a "nonRamdom" array, 
    const myFriends = this.state.friends;
    
    // find index of friend to be disabled, if not disabled, update score and set friend to disabled
    const targetIndex =  myFriends.findIndex(x => x.id===id);
    if (myFriends[targetIndex].status==="active" && this.state.gameStatus !== "gameOver"){
      this.setState({score:this.state.score+1});
      this.setDisabledCreateRandomOrder(id);
    } else  
      this.endGame();
};

  handleResetGame = () => {
    // reset all friends to active
      this.state.friends.forEach(element => {
        element.status = 'active'
      });
    // reset score
    this.setState({score:0});
    
    console.log("start: " + this.state.score);
    //randomize friends
    this.randomizeFriends(this.state.friends);

    // set game to active
    this.setState({gameStatus:'active'});
  }
  // Map over this.state.friends and render a FriendCard component for each friend object
  
  render() {
    // if the game is over, set the status of friend card
    let opacity = 0;
    if (this.state.gameStatus === "gameOver"){
      opacity = .5;
    }
    let display = "block"
    if (this.state.resetButtonDisplay===false){
      display = "none";
    }
    
    return (
      <div>
        <Jumbotron
          title="Clicky with Friends"
          instructions="click on a friend once to score a point. Click any friend twice and game ends."
          score={this.state.score}
          total={this.state.total} />       
        <Wrapper>
          <Row>
            <Col size="lg-12">
                {
                  this.state.friends.map(friend => (
                  <FriendCard
                    onClick={this.handleSetFriendState}
                    id={friend.id}
                    key={friend.id}
                    name={friend.name}
                    image={friend.image}
                    opacity={opacity}
                    gameStatus = {this.state.gameStatus}
                    status = {friend.status}
                    font = {friend.font}
                  />
                ))
               }
            </Col>
          </Row>
          <Row>
            <Col size="lg-12">
                <ResetButton
                  className = 'btn mt-4'
                  btnDisplay={display}
                  onClick={this.handleResetGame}
                  type="danger"> 
                  Reset Game
                </ResetButton>
            </Col>
          </Row>
        </Wrapper>
      </div>
    );
  }
}

export default App;
