import React, { Component } from 'react';
import data from './data.json'; // here we import the JSON data
import './user.css';

// this is a functional component used when
// we render each user's data to the screen
// in the main component
const User = ({ name, age }) => (
  <li className="userPanel">
    <p>Name: {name}</p>
    <p>Age: {age}</p>
  </li>
)

// This is our main component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      loaded: false
    }
  }
  // note that we use 'didMount' rather than 'willMount'
  // if we used 'willMount', this setState would happen before the first render
  // if we were gathering data from a fetch, that could potentially result
  // in an empty screen whiles the fetch is completing
  componentDidMount() {
    // here we use the JSON data to populate our component state
    // `this.state.loaded` is used to signify that data exists, state is set and
    // its safe to render the date 
    const users = data;
    this.setState(() => ({
      users,
      loaded: true
    }))
  }
  render() {
    const { users, loaded } = this.state;
    if (!loaded) {
      // if our data isn't ready
      // we'll render a loading message
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }
    return (
      <div className="wrapper">
        <h1 className="title">Users</h1>
        <ul className="userList">
          {
            // here we take our data from state
            // and using a functional component called <User />
            // we create a new <User /> for each user in our state
            // which is rendered to the screen
            users.map(user => (
              <User
                // the key is important, React uses this to figure out if
                // it needs to re-render. The key helps it distinguish
                // those changes
                key={user._id} 
                name={user.name}
                age={user.age}
              />
            ))
          }
        </ul>
      </div>
    );
  }
}

export default App;
