import React from "react";
import "./FriendCard.css";

const FriendCard = ({id, opacity, name, image, status, onClick}) => (
  // style card if the game is over by darkening the opacity to the linear gradient of the background image
  <div  className={`card d-flex align-content-end h-100}`}
        onClick={() => onClick(id)} 
        style={{ backgroundImage:
          `linear-gradient(rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, ${opacity})), 
          url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize:'100% 100%'}}
        >
      <p className='name'>
        {name} {status}
      </p>
  </div>
);

export default FriendCard;
