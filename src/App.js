import React, {Component } from 'react';

import classes from './App.module.css';
import Person from './Person/Person'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'


class App extends Component {

  state =  {
      persons: [
        { id: 'asfa1',name: 'Max', age: 28 },
        { id: 'safsf',name: 'Manu', age: 29 },
        { id: 'kflfk',name: 'Stephanie', age: 26 }
      ],
      otherState: 'some other value',
      showPersons:false
    };


  nameChangedHandler = (e,id) =>{
    const personIndex = this.state.persons.findIndex(p=>{
      return p.id ===id;
    });

    //personsで入力したidと一致するidを返す

    const person ={
      ...this.state.persons[personIndex]
    } 
    //personsのすべての要素

    // const person = Object.assign({},this.state.persons[personIndex])

    person.name = e.target.value
    //person.nameは入力した値

    const persons = [...this.state.persons]
    //personsはすべてのpersons
    persons[personIndex] = person;

    this.setState({persons:persons})
  } 

  deletePersonHandler = (personIndex)=>{
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(personIndex,1)
    this.setState({persons:persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }


  

  render(){

    let persons = null
    let btnClass = '';

    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person,index) => {
            return <ErrorBoundary key={person.id}>
                <Person 
                click={()=>this.deletePersonHandler(index)}
                name={person.name} 
                age={person.age}
                changed={(e)=>this.nameChangedHandler(e,person.id)}
                />
              </ErrorBoundary>
          })}
          </div> 
      )


      btnClass = classes.Red
    }

    let assignedClasses = []; //classesという入れ物
    if(this.state.persons.length<=2){
      assignedClasses.push(classes.red) //classesという入れ物にredをいれる
    }

    if(this.state.persons.length<=1){
      assignedClasses.push(classes.bold)
    }


    return (
      <div className={classes.App}>
        <h1>Hi I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working</p>
        <button 
        className={btnClass}
        onClick={this.togglePersonsHandler}>
          Toggle Persoms</button>
          {persons}
      </div>
    )
  }
  // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Does this work now'));
}


export default App;
