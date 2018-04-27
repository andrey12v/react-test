import React, { Component } from 'react';

import Person from './Person/Person'

class App extends Component {
  state = {
    persons: [
      {id: '1', name: 'Max', age: 28},
      {id: '2', name: 'Bob', age: 15}
    ],
    showPersons: false
  }


  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        {name: newName, age: 18},
        {name: 'Lee', age: 23}
      ]
    })
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    //with this operation we making a copy of persons array
    //we mutate the state
    const person = {
      ...this.state.persons[personIndex]
    };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons: persons});
  }


  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deletePersonsHandler = (personIndex) => {
    //since our persons array is a pointer to teh actual array
    //when we delete element we delete the element of the array
    //in order to avoid that we need to create a copy of persons array
    // we do it by means of slice method
    //const persons = this.state.persons;
    //const persons = this.state.persons.slice();
    //or we can do it with the spread operator
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  render() {
    const btnStyle = {
      backgroundColor: 'red',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      curosor: 'pointer'
    }

    let persons = null;
    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonsHandler(index)}
              name={person.name}
              age={person.age}
              //we added this key to update elements efficiently
              key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id) } />
          })}
        </div>
      );
      //we set style dynamically here
      btnStyle.backgroundColor = 'blue'
    }

    //we set classes dinamically by setting classes variable with red and blue based on the condition
    let classes = [];
    if(this.state.persons.length <= 1){
      classes.push('red');  //classes will be red
    }
    if (this.state.persons.length <= 0){
      classes.push('bold');  //classes red and bold
     }

    return (
        <div className={classes.App}>
          <h1>Test react components</h1>
          <p className={classes.join(' ')}>This is test application to show how react works</p>
          <button
          style={btnStyle}
          onClick={this.togglePersonHandler}>Toggle Persons</button>
          {persons}
        </div>
    );
  }
}

export default App;
