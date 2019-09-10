import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    name: "",
    status: ""
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.name}/`);
    console.log(await res.json());

  }
  handleChange = async (e) => {
    console.log(e.target.value)
    this.setState({ name: e.target.value })
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.name}/`);
    if (res.status !== 200) {
      this.setState({ state: false });
      console.log("blad");
    } else {
      console.log(res);
    }
  }
  renderLoader = () => {
    if (!this.state.status) {
      return (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )
    } else {

    }
  }
  async componentDidMount() {
    let res = await fetch('https://pokeapi.co/api/v2/pokemon/?&limit=400')
    let data = await res.json();
    const names = data.results.map(ele => ele.name);
    const val = 'ab'
    const regex = new RegExp(`^${val}`, "g");
    console.log(regex)
    const filtr = names.filter(name => {
      if (name.match(regex)) {
        return true
      }
      else return false
    })
    console.log(filtr);
  }
  render() {
    return (
      <div className="App" >
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="pokemonName">Pokemon name:</label>
              <p>{this.state.name}</p>
              <input className="mb-3 form-control" id="pokemonName" type="text" onChange={this.handleChange} />
              <input className="btn btn-primary" type="submit" value="get Pokemon" ></input>
            </div>
          </form>
        </div>
        {this.renderLoader()}
      </div >
    );
  }
}

export default App;
