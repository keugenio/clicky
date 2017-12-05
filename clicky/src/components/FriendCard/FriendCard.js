import React from "react";
import "./FriendCard.css";

const FriendCard = props => (
  // remember to account for 0 index of friends array by passing
  <div className={`card ${props.gameStatus}`} onClick={() => props.setStateFriend(props.id)}>
    <div className="img-container">
      <img alt={props.name} src={props.image} />
    </div>
    <div className="content d-flex align-content-center">
      <p>
        {props.name}
      </p>
      <div className="ml-auto">{props.status}</div>
    </div>
  </div>
);

export default FriendCard;
