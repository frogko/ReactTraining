import React, { Component } from 'react';
import Person from './Person/Person';
import './App.css';
import Radium from 'radium';

class App extends Component {
  state = {
    persons: [
      { id:'123sd', name: 'Furkan', age : 28},
      { id:'324fd', name: 'Hakan',  age : 29},
      { id:'235sdf', name: 'Kagan',  age: 26}
    ],
    otherState: 'Some other value',
    showPersons: false
  }

  toggleHandler = (event) => {
    const falsePersons = this.state.showPersons;

    this.setState({
      showPersons: !falsePersons
    });
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }
    
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    })
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({
      persons: persons
    });
  }

  render() {
    const style = {
      backgroundColor: 'green',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'red',
        color: 'blue',
      }
    }

    let persons = null;

    if( this.state.showPersons ) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              name={person.name}
              age={person.age} 
              key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id)}
              click={() => this.deletePersonHandler(index)}
              />
          })}
        </div>
      );
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'yellow',
        color: 'black',
      }
    }

    const classes = [];
    
    if(this.state.persons.length <= 2){
      classes.push('red')
    }
    if(this.state.persons.length <= 1){
      classes.push('bold')
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>

        <button
          onClick={this.toggleHandler}
          style={style}>
            Toggle Persons
        </button>

        { persons }
      </div>
    )
  }
}

export default Radium(App);