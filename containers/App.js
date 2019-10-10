import React, { Component } from 'react';
import './App.css';
import CardList from '../components/CardList';

const urls = ['https://swapi.co/api/people/',
'https://swapi.co/api/people/?page=2',
'https://swapi.co/api/people/?page=3',
'https://swapi.co/api/people/?page=4',
'https://swapi.co/api/people/?page=5'];

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
      	people: [],
      	image: [],
        searchbar: ''
      };
  }

 componentDidMount() {
    this.getData(urls)
      .then(data => {
        const dataResults = data.map(obj => obj.results);
        const dataFlat = dataResults.flat();
        this.setState({
          people: dataFlat
        })
        const nameUrls = dataFlat.map(obj => `https://cors-anywhere.herokuapp.com/https://api.duckduckgo.com/?q=${obj.name.replace(" ", "+")}+star+wars&format=json`);
        this.fetchImgSeq(nameUrls);
      })
  }
  //Avoid duckduckgo 429 too many requests, used sequential fetch instead
  fetchImgSeq = async(Urls) => {
    for (const url of Urls) {
      const result = await this.fetchUrl(url);
      this.setState({
        image: [...this.state.image, result.Image]
      })
    }
  }

fetchUrl = async (url) => {
  try {
  const resp = await fetch(url);
  return await resp.json();
} catch(err) {
  console.log("there's an error", err);
}
}

getData = async (urls) => {
  return await Promise.all(urls.map(url => this.fetchUrl(url)))
}
  
  render() { 
    const { people, image, searchbar } = this.state;
    const filteredPeople = people.map(pple => {
      return pple.name.toLowerCase().includes(searchbar.toLowerCase());
    })
    if (people.length !== 0) {
    return (
     <div className="tc">
	     <h1>SWAPI</h1>
	     <h3>My Star wars API</h3>
	     <p>All the Star Wars <strong>CHARCATERS</strong> You've ever wanted:
	     From all <strong>SEVEN</strong> Star Wars movies</p>
	     <CardList people={filteredPeople} image={image} />
     </div>
    );
    } else {
      return (
      <h1 className="tc">Loading...</h1>
    );
    }
  }
}

export default App;
