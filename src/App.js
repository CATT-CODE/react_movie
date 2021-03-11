import React, { Component } from 'react'
import axios from 'axios';

export default class App extends Component {
  
  state = {
    isLoading: true,
    movieArray: [],
    inputMovie: "",
    errorMessage: "",
  };

  handleOnChange = (event) => {
    this.setState({
      inputMovie: event.target.value,
      errorMessage: "",
    });
  }

  handleOnSubmit = async (event) => {
    if (this.state.inputMovie.length === 0) {
      this.setState({
        errorMessage: "Please provide a valid input",
      })
    } else {
      let result = await axios.get(
        `http://www.omdbapi.com/?s=${this.state.inputMovie}&apikey=96fac7a1`
      );
      this.setState({
        movieArray: result.data.Search
      });
    };
    };
  
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter Movie Title"
          name="inputMovie"
          onChange={this.handleOnChange}
        >
        </input>
        <button
          onClick={this.handleOnSubmit}
          type="submit"
        >
          Submit
        </button>
        <br/>
        <div className="row">
          {this.state.errorMessage.length > 0 ? <div>{this.state.errorMessage}</div> : <div>{this.state.movieArray.map((movie) => <div key={movie.id}>{movie.Title}</div>)}</div>}
          
          
      </div>
      </div>
    )
  }
}
