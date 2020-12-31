import React, {Component } from 'react';
import './App.css';
import Person from './Person/Person'

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
    const style={
      backgroundColor:'white',
      font:'inherit',
      barder:'1px solid blue',
      padding:'8px',
      cursor:'pointer'
    };

    let persons = null

    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person,index) => {
            return <Person 
            click={()=>this.deletePersonHandler(index)}
            name={person.name} 
            age={person.age}
            key={person.id}
            changed={(e)=>this.nameChangedHandler(e,person.id)}
            />
          })}
          </div> 
      )
    }


    return (
      <div className="App">
        <h1>Hi I'm a React App</h1>
        <p>This is really working</p>
        <button 
        style={style}
        onClick={this.togglePersonsHandler}>
          Toggle Persoms</button>
          {persons}
      </div>
    )
  }
  // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Does this work now'));
}


export default App;
