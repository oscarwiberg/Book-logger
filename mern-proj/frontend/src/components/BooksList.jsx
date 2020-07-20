import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Book = (props) => (
  <tr>
    <td>{props.book.username}</td>
    <td>{props.book.title}</td>
    <td>{props.book.pages}</td>
    <td>{props.book.date.substring(0, 10)}</td>
    <td>
      <Link to={'/edit/' + props.book._id}>edit</Link> |{' '}
      <a
        href="#"
        onClick={() => {
          props.deleteBook(props.book._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class BooksList extends Component {
  constructor(props) {
    super(props);

    this.deleteBook = this.deleteBook.bind(this);

    this.state = { books: [] };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/books/')
      .then((res) => {
        this.setState({ books: res.data });
      })
      .catch((err) => console.log(err));
  }

  deleteBook(id) {
    axios
      .delete('http://localhost:5000/books/' + id)
      .then((res) => console.log(res.data));
    this.setState({
      books: this.state.books.filter((element) => element._id !== id),
    });
  }

  booksList() {
    return this.state.books.map((currentBook) => {
      return (
        <Book
          book={currentBook}
          deleteBook={this.deleteBook}
          key={currentBook._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Books</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Title</th>
              <th>Pages</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.booksList()}</tbody>
        </table>
      </div>
    );
  }
}
