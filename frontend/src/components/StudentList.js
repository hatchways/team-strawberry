import React, { Component } from "react";

import "./StudentList.css";
import Student from "./Student";
import Search from "./Search";

import * as StudentAPI from "../StudentAPI";
import Context from "../Context";

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      filteredStudents: []
    };
    this.addTag = this.addTag.bind(this);
    this.handleNameSearch = this.handleNameSearch.bind(this);
    this.handleTagSearch = this.handleTagSearch.bind(this);
  }

  async componentDidMount() {
    if (this.state.students.length < 1) {
      let { students } = await StudentAPI.getAll();
      students.map(student => (student.tags = []));
      this.setState({
        students: students,
        filteredStudents: students
      });
    }
  }

  handleNameSearch = evt => {
    const name = evt.target.value.toLowerCase();
    this.setState(prevState => ({
      filteredStudents: prevState.students.filter(({ firstName, lastName }) => {
        return (
          firstName.toLowerCase().includes(name) ||
          lastName.toLowerCase().includes(name)
        );
      })
    }));
  };

  handleTagSearch = evt => {
    const tag = evt.target.value.toLowerCase();
    if (tag.length < 1) {
      this.setState(prevState => ({
        filteredStudents: [...prevState.students]
      }));
    } else {
      this.setState(prevState => ({
        filteredStudents: prevState.students.filter(({ tags }) => {
          return tags.includes(tag);
        })
      }));
    }
  };

  addTag = (studentId, tag) => {
    this.setState(prevState => ({
      filteredStudents: prevState.students.map(student => {
        return student.id === studentId
          ? { ...student, tags: [...student.tags, tag] }
          : { ...student };
      }),
      students: prevState.students.map(student => {
        return student.id === studentId
          ? { ...student, tags: [...student.tags, tag] }
          : { ...student };
      })
    }));
  };

  render() {
    const initialState = {
      addTag: this.addTag
    };

    const studentDisplay = this.state.filteredStudents.map(student => (
      <Student student={student} key={student.id} addTag={this.addTag} />
    ));

    if (this.state.students.length < 1)
      return <React.Fragment>No users found...</React.Fragment>;
    return (
      <div className="student-container">
        <Context.Provider value={initialState}>
          <Search
            search={this.handleSearch}
            handleNameSearch={this.handleNameSearch}
            handleTagSearch={this.handleTagSearch}
          />
          {studentDisplay}
        </Context.Provider>
      </div>
    );
  }
}

export default StudentList;
