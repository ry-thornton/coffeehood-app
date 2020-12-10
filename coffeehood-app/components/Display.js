import React, { useState, useEffect } from "react";

function Display(props) {
  const [location, setLocation] = useState("");

  useEffect(() => {});

  let changeHandler = (event) => {
    console.log(location);
    setLocation(event.target.value);
  };

  let submitHandler = (event) => {
    event.preventDefault();
    props.search(location);
  };

  return (
    <div>
      <nav className="navbar is-transparent">
        <div className="navbar-item">
          <span>CoffeeHood</span>
        </div>
        <div className="navbar-end">
          <div className="buttons">
            <button className="button ">Get Matched!</button>
            <button className="button">Login</button>
          </div>
        </div>
      </nav>
      <form onSubmit={submitHandler}>
        <input
          className="input"
          placeholder="Enter an address"
          type="text"
          value={location}
          onChange={changeHandler}
        />
        <input className="button" type="submit" value="Search" />
      </form>
    </div>
  );
}

export default Display;
