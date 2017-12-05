import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Jumbotron from "./components/Jumbotron";
import Row from "./components/Row";
import Col from "./components/Col";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    score:0,
    total: 0,
    gameStatus:""
  };

  // before anything renders, get the total number of friends from the json file.  Set the total to be 
  // displayed on the jumbotron
  componentDidMount(){
    this.setState(friends);
    this.setState({total:this.state.friends.length});
  }

  // set the state of the friend as "disabled" if CHOSEN otherwise the default is "active"
  setStateFriend = id => {
      // refer to the current array of friends as a "nonRamdom" array, 
      const myFriends = this.state.friends;
      
      // find index of friend to be disabled, if not disabled, update score and set friend to disabled
      const targetIndex =  myFriends.findIndex(x => x.id===id);
      if (myFriends[targetIndex].status==="active"){
        this.setState({score:this.state.score+1});
        this.setDisabledCreateRandomOrder(id);
      } else  
        this.endGame()
  };

  // function sets the state of the friend chosen to be "disabled" and randomizes the original friends array
  setDisabledCreateRandomOrder = id => {
     // refer to the current array of friends as a "nonRamdom" array, 
     const nonRandomFriends = this.state.friends;
     
     // fidnd index of friend to be disabled, set friend to disabled
     const disabledIndex =  nonRandomFriends.findIndex(x => x.id===id);
     nonRandomFriends[disabledIndex].status="disabled";
 
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

  // function "ends" game by setting the gameStatus to "over"
  endGame = () => {
    this.setState({gameStatus:"gameOver"});
    alert(this.state.gameStatus);
  }

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <div>
        <Jumbotron
          title="Clicky with Friends"
          instructions="click on a friend once to score a point. Any more ends game."
          score={this.state.score}
          total={this.state.total} />       
        <Wrapper>
          <Row>
            <Col size="lg-12">
                {this.state.friends.map(friend => (
                  <FriendCard
                    setStateFriend={this.setStateFriend}
                    id={friend.id}
                    key={friend.id}
                    name={friend.name}
                    image={friend.image}
                    status={friend.status}
                    gameStatus = {this.state.gameStatus}
                  />
                ))}
            </Col>
          </Row>
        </Wrapper>
      </div>
    );
  }
}

export default App;
