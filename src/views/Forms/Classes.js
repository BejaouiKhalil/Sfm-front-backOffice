import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Alert
} from "reactstrap";

class classes extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      name: "",
      description: "",
      alert: null
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }
  handleInput = async event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log({ [name]: value });
  };
  handleSubmit = async () => {
    const requestBody = {
      query: `
          mutation {
            createClass(
              input: {
                name: "${this.state.name}"
                description: "${this.state.description}"
                imageUrl: ""
              }
            ) {
              id
              name
            }
          }
      `
    };
    console.log(requestBody);
    const res = await fetch("http://localhost:4000/", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(res.data);
    this.setState({
      alert: <Alert color="success">classe ajouter avec succés</Alert>
    });
  };

  closeAlert = () => {
    this.setState({ alert: null });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Class Form</strong>
            <div onClick={this.closeAlert}>{this.state.alert}</div>
          </CardHeader>
          <CardBody>
            <Form
              action=""
              method="post"
              encType="multipart/form-data"
              className="form-horizontal"
              onSubmit={this.handleSubmit}
            >
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="name">Name</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder=""
                    onChange={this.handleInput}
                  />
                  <FormText color="muted">classe name</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Description</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="description"
                    name="description"
                    placeholder=""
                    onChange={this.handleInput}
                  />
                  <FormText color="muted">classe description</FormText>
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              size="sm"
              color="primary"
              onClick={this.handleSubmit}
            >
              <i className="fa fa-dot-circle-o" /> Submit
            </Button>
            <Button type="reset" size="sm" color="danger">
              <i className="fa fa-ban" /> Reset
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default classes;
