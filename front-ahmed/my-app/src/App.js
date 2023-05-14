import './App.css';
import axios from 'axios';
import React, { Component } from 'react';

const api = axios.create({
  baseURL: 'http://localhost:5500'
});

class App extends Component {
  state = {
    persons: [],
    name: '',
    age: '',
    gender: '',
    email: ''
  }

  getPersons = async () => {
    try {
      const { data } = await api.get('/');
      this.setState({ persons: data });
    } catch (err) {
      console.log(err);
    }
  }

  createPerson = async (event) => {
    event.preventDefault(); 
    const { name, age, gender, email } = this.state;
    try {
      const { data } = await api.post('/users', { "name": name, "age": age, "gender": gender, "email": email });
      const newPerson = data;
      this.setState(prevState => ({
        persons: [...prevState.persons, newPerson],
        name: '',
        age: '',
        gender: '',
        email: ''
      }));
    } catch (err) {
      console.log(err);
    }
  }

  getPersonById = async (id) => {
    try {
      const { data } = await api.get(`/users/${id}`);
      this.setState({ persons: [data] });
    } catch(err) {
      console.log(err);
    }
  }

  updatePerson = async (id) => {
    const { name, age, gender, email } = this.state;
    try {
      const { data } = await api.put(`/users/${id}`, { "name": name, "age": age, "gender": gender, "email": email });
      console.log(data);
      this.getPersons();
    } catch(err) {
      console.log(err);
    }
  }

  deletePerson = async(id) => {
    try {
      await api.delete(`/users/${id}`);
      this.setState(prevState => ({
        persons: prevState.persons.filter(person => person.id !== id)
      }));
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    const { name, age, gender, email } = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
         <h1>Welcome To my CRUD</h1> 
         <h4>Enter Your Data to Create User</h4>
          <form onSubmit={this.createPerson} >
            <input type='text' placeholder='name'  value={name} onChange={(event) => this.setState({ name: event.target.value })} ></input>
            <input type='number'  placeholder='age' value={age} onChange={(event) => this.setState({ age: event.target.value })} ></input>
            <input type='text' placeholder='gender' value={gender} onChange={(event) => this.setState({ gender: event.target.value })} ></input>
            <input type='text'  placeholder='email' value={email} onChange={(event) => this.setState({ email: event.target.value })} style={{ width: '150px' , borderRadius: '5px' ,margin:10 , borderColor: 'white'}}></input>
            <button type='submit' style={{ width: '200px', borderRadius: '5px',backgroundColor: '#A996D3' ,borderColor: 'white'}}>Create</button>
          </form>
          <hr style={{width:'650px' ,borderColor: 'white'}}></hr>
          <form onSubmit={(event) => {
            event.preventDefault();
            let id = document.getElementById('updateId').value;
            this.updatePerson(id)
          }}>
            <input type='text' id='updateId' placeholder='id' ></input>
            <input type='text' placeholder='name' value={name} onChange={(event) => this.setState({ name: event.target.value })} ></input>
            <input type='number' placeholder='age' value={age} onChange={(event) => this.setState({ age: event.target.value })} ></input>
            <input type='text' placeholder='gender' value={gender} onChange={(event) => this.setState({ gender: event.target.value })} ></input>
            <input type='text' placeholder='email' value={email} onChange={(event) => this.setState({ email: event.target.value })} ></input>
            <button type='submit' value="Update" style={{ width: '200px', borderRadius: '5px',backgroundColor: '#A996D3' ,borderColor: 'white'}}>Update</button>
          </form>
          <hr style={{width:'650px' ,borderColor: 'white'}}></hr>
          <form onSubmit={(event) => {
            event.preventDefault();
            let id = document.getElementById('getId').value;
            this.getPersonById(id)
          }}>
            <input type='text' id='getId' placeholder='id' ></input>
            <button type='submit' value="Get" style={{ width: '200px', borderRadius: '5px',backgroundColor: '#A996D3' ,borderColor: 'white'}}>Get</button>
          </form>
          <hr style={{width:'650px',borderColor: 'white'}}></hr>
          {this.state.persons.map((person) => (
            <div key={person.id} style={{borderRadius: '5px', backgroundColor: '#E5E4E2', padding: '10px', margin: '10px', width: '400px'}}>
              <div>ID: {person.id}</div>
              <div>Name: {person.name}</div>
              <div>Age: {person.age}</div>
              <div>Gender: {person.gender}</div>
              <div>Email: {person.email}</div>
              <button onClick={() => this.deletePerson(person.id)} style={{ borderRadius: '5px',backgroundColor: '#A996D3' ,borderColor: 'white'}}>Delete</button>
            </div>
          ))}
          <button onClick={this.getPersons} style={{ width: '200px' , borderRadius: '5px' ,margin:20,backgroundColor: '#A996D3', borderColor: 'white'}}>get all</button>
        </header>
      </div>
    )
  }
}

export default App;