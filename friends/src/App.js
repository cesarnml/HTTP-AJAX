import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Friends from './components/Friends/Friends';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import AddFriend from './components/AddFriend/AddFriend';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      newName: '',
      newAge: '',
      newEmail: '',
    };
    // Damn this to hell.
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAge = this.handleChangeAge.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/friends")
      .then(response => {
        this.setState({ friends: response.data });
      })
      .catch(error =>
        console.error(`Friends request produced an error: ${error}`)
      );
  }

  handleChangeName = event => {
    this.setState({ newName: event.target.value });
  };

  handleChangeAge = event => {
    this.setState({ newAge: event.target.value });
  };

  handleChangeEmail = event => {
    this.setState({ newEmail: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if( this.state.newName === '' || this.state.newAge === '' || this.state.newEmail === '') return alert('All fields required');
    const newFriend = {
      name: this.state.newName,
      age: this.state.newAge,
      email: this.state.newEmail
    };

    axios
      .post(`http://localhost:5000/friends`, newFriend )
      .then(res => {
        this.setState({
          friends: res.data,
          newName: '',
          newAge: '',
          newEmail: '',
        })
      })
      .catch(error => console.error(error));
  };

  render() {
    return (
      <div className="App">
        <div className="FriendList">
          <header>
            <h2>Friends List:</h2>
          </header>
          <Friends friends={this.state.friends} />
        </div>

        <Form className="FriendForm">
          <h2>Friend Form:</h2>

          <FormGroup>
            <Label for="Name">Name: </Label>
            <Input required className="Input" type="text" name="name" id="name" placeholder="Add name" autoComplete="name" onChange={this.handleChangeName} value={this.state.newName} />
          </FormGroup>
          <FormGroup>
            <Label for="age">Age: </Label>
            <Input required className="Input" type="number" name="age" id="age" placeholder="Add age" onChange={this.handleChangeAge} value={this.state.newAge} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email: </Label>
            <Input required className="Input" type="email" name="email" id="email" placeholder="Add email" autoComplete="email" onChange={this.handleChangeEmail} value={this.state.newEmail}  />
          </FormGroup>
          <Button color="primary" type="submit" className="btn-add" onClick={this.handleSubmit}>
            Add Friend
          </Button>
          <p className="InputWarning">All fields are required for input</p>
        </Form>
      </div>
    );
  }
}

export default App;
