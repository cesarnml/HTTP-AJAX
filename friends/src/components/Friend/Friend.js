import  React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import './Friend.css'

class Friend extends Component {
  constructor() {
    super();
    this.state = {
      friend: {},
      newName: "",
      newAge: "",
      newEmail: ""
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`http://localhost:5000/friends/${id}`)
      .then(response => this.setState(() => ({ friend: response.data })))
      .catch(error => {
        console.error("Friend request caused an error: ", error);
      });
  }

  render() {
    if (!this.state.friend) {
      return <div>No friend exist...</div>;
    }

    const { name, age, email } = this.state.friend;
    return (
      <div className="FriendPage">
        <NavLink to="/">
          <p className="ReturnToFriends">Return to Friends List</p>
        </NavLink>
        <Card className="FriendCard">
          <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardText>Age: {age}</CardText>
            <CardText>E-mail: {email}</CardText>
          </CardBody>
        </Card>
          <Button onClick={this.handleDelete} type="submit" color="danger">
            Delete Friend
          </Button>
        <Form className="FriendForm">
          <h2>Friend Form:</h2>
          <FormGroup>
            <Label for="Name">Name: </Label>
            <Input
              required
              className="Input"
              type="text"
              name="name"
              id="name"
              placeholder="Add name"
              autoComplete="name"
              onChange={this.handleChangeName}
              onSubmit={this.handleSubmit}
              value={this.state.newName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="age">Age: </Label>
            <Input
              required
              className="Input"
              type="number"
              name="age"
              id="age"
              placeholder="Add age"
              onChange={this.handleChangeAge}
              onSubmit={this.handleSubmit}
              value={this.state.newAge}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email: </Label>
            <Input
              required
              className="Input"
              type="email"
              name="email"
              id="email"
              placeholder="Add email"
              autoComplete="email"
              onChange={this.handleChangeEmail}
              onSubmit={this.handleSubmit}
              value={this.state.newEmail}
            />
          </FormGroup>
          <Button
            color="primary"
            type="submit"
            className="btn-add"
            onClick={this.handleSubmit}
          >
            Update Friend
          </Button>
          <p className="InputWarning">At least one field must update</p>
        </Form>
      </div>
    );
  }

  handleDelete = event => {
    const id = this.props.match.params.id;
    axios
      .delete(`http://localhost:5000/friends/${id}`)
      .then(res => {
        this.setState({
          friends: res.data,
          newName: '',
          newAge: '',
          newEmail: '',
        });
        alert('Friends List has been updated. Please return home.')
      })
      .catch(error => console.error(error));
  };

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
    if( this.state.newName === '' && this.state.newAge === '' && this.state.newEmail === '') return alert('At least one field must be updated.');
    const newFriend = {
      name: this.state.newName,
      age: this.state.newAge,
      email: this.state.newEmail
    };

    event.preventDefault();
    const id = this.props.match.params.id;
    axios
      .put(`http://localhost:5000/friends/${id}`, newFriend)
      .then(res => {
        this.setState({
          friends: res.data,
          newName: "",
          newAge: "",
          newEmail: ""
        });
        alert('Friends List has been updated. Please return home.')
      })
      .catch(error => console.error(error));
  };
}

export default Friend;
