import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class CreateBook extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePages = this.onChangePages.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      title: '',
      pages: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/').then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
          username: res.data[0].username,
        });
      }
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangePages(e) {
    this.setState({
      pages: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const book = {
      username: this.state.username,
      title: this.state.title,
      pages: this.state.pages,
      date: this.state.date,
    };

    axios.post('http://localhost:5000/books/add', book);

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Add new book</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Total pages: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.pages}
              onChange={this.onChangePages}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create new book"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
