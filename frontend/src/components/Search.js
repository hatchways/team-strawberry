import React, { Component } from "react";
import "./Search.css";

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      tag: ""
    }
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange = (evt) => {
    this.setState({
      name: evt.target.value
    })
    this.props.handleNameSearch(evt);
  }

  handleTagChange = (evt) => {
    this.setState({
      tag: evt.target.value
    });
    this.props.handleTagSearch(evt);
  }

  render() {

    return (
      <React.Fragment>
        <form className="searchForm">
          <input
            id="name-input"
            name="name"
            autoComplete="off"
            value={this.state.name}
            placeholder="Search by name"
            onChange={this.handleNameChange} />
          <input
            id="tag-input"
            name="tag"
            value={this.state.tag}
            placeholder="Search by tag"
            onChange={this.handleTagChange} />
        </form>
      </React.Fragment>
    );
  }
}

export default Search;