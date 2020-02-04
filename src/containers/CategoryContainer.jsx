import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import SearchDisplay from '../components/SearchDisplay.jsx';
import Map from '../components/Map.jsx';
import '../css/CategoryPage.css';

class CategoryContainer extends Component {
  constructor(props) {
    super(props);

    if (this.props.categoryPage && this.props.current < 50) {
      window.onscroll = debounce(() => {
        if (this.props.current >= 50) return;
        if (document.documentElement.scrollTop > document.documentElement.scrollHeight - window.innerHeight - 2) {
          this.props.search();
        }
      });
    }
  }

  render() {
    // render map and list of businessess from searchResults arr in the state
    let search = null;
    const searchDisplayResults = this.props.searchResults.map((element, i) => (
      <div id="list">
        <button type="button" className="list-item" key={i} onClick={() => this.props.selectVenue(element.id, element.name, element.url, element.image, element.location, element.phone, element.latitude, element.longitude)}>
          <img src={`${element.image}`} alt="venue" />
          {element.name}
          <br />
          {element.category}
          <br />
          {element.location.address1}
          {' '}
          {element.location.address2}
          <br />
          {element.location.city}
,
          {element.location.state}
          {' '}
          {element.location.zip_code}
          {element.phone}
          <br />
          {/* // need to grab the unique id provided from the yelp api data search results that are saved in state. need to use it to save into our database */}
          {/* <button onClick={() => this.props.selectVenue(element.id, element.name, element.url, element.image, element.location, element.phone)}>Select</button> */}
        </button>
      </div>
    ));

    if (this.props.categoryPage) {
      search = (
        <div id="category-body">
          <SearchDisplay
            searchDisplayResults={searchDisplayResults}
          />
          <Map latitude={this.props.latitude} longitude={this.props.longitude} />
        </div>
      );
    }

    return (
      <div>
        <section className="search-bar">
          <img id="logo-pic-category" src="https://image.flaticon.com/icons/png/512/876/876569.png" alt="logo" />
          <input type="input" id="searchInput" placeholder="Business or Category" onChange={this.props.setSearchInput} />
          <input type="input" id="location" placeholder="Location" onChange={this.props.setLocation} />
          <input type="button" id="searchButton" onClick={this.props.search} />
        </section>
        {search}
      </div>
    );
  }
}

export default CategoryContainer;
