import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {
        name: 'Jorge',
        age: 25
      },
      {
        name: 'Max',
        age: 28
      }
    ]
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        {
          name: newName,
          age: 25
        },
        {
          name: 'Max',
          age: 28
        }
      ]
    });
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        {
          name: 'Jorge',
          age: 25
        },
        {
          name: event.target.value,
          age: 28
        }
      ]
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button onClick={() => this.switchNameHandler('Omiranha')}>Switch Name</button>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age}
          click={this.switchNameHandler.bind(this, 'Miranha')}/>
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age} 
          changed={this.nameChangedHandler}/>
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App'));
  }
}

export default App;
