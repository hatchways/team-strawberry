import React, { Component } from "react";
import "./Student.css";
import NewTag from "./NewTag";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      tags: []
    };
    this.calculateAverage = this.calculateAverage.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
    this.addTags = this.addTags.bind(this);
  }

  addTags(tag) {
    this.setState(prevState => ({
      ...prevState,
      tags: [...prevState.tags, tag]
    }));
  }

  calculateAverage(arr) {
    let total = arr.reduce((curr, prev) => {
      return Number(curr) + Number(prev);
    }, 0);
    return total / arr.length;
  }

  handleIconClick() {
    console.log("im in the matrix");
    this.setState(prevState => ({
      expand: !prevState.expand
    }));
  }

  render() {
    const { student } = this.props;
    const { grades } = student;
    const average = this.calculateAverage(grades);
    const { expand } = this.state;

    let icon = expand ? "fas fa-minus" : "fas fa-plus";

    const expandedView = expand ? (
      <React.Fragment>
        <div className="grades">
          {grades.map((grade, idx) => (
            <p key={idx}>
              Test {+idx + 1}: {grade}%
            </p>
          ))}
        </div>
        <div className="tag-list">
          {this.state.tags.map((tag, idx) => (
            <p className="tag">{tag}</p>
          ))}
        </div>
        <NewTag id={student.id} addTags={this.addTags} />
      </React.Fragment>
    ) : null;

    return (
      <div className="student-card">
        <div className="expand-button">
          <button className="button" onClick={this.handleIconClick}>
            <i className={icon} />
          </button>
        </div>
        <img
          src={student.pic}
          alt={`student-img-${student.id}`}
          className="student-avatar"
        />
        <div className="student-main">
          <p className="student-name">
            {student.firstName} {student.lastName}
          </p>
          <div className="student-description">
            <p>Email: {student.email}</p>
            <p>Company: {student.company}</p>
            <p>Skill: {student.skill}</p>
            <p>Average: {average} %</p>
          </div>
          {expandedView}
        </div>
      </div>
    );
  }
}

export default Student;
