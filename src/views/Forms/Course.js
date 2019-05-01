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

import GetCategorie from "./SelectClasse/selectClasse";

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
      image: null,
      classe: null,
      error: null,
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

  handleSubmit = async () => {
    const files = this.state.image;

    let image;

    if (files) {
      const data = new FormData();

      data.append("file", files);
      data.append("upload_preset", "hw6yy4dh");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/khalilsfm/image/upload",
        {
          method: "POST",
          body: data
        }
      );

      const file = await res.json();
      console.log(file);
      if (!file.error) {
        image = file.secure_url;
      } else {
        this.setState({
          error: file.error
        });
      }
    }

    if (!this.state.error) {
      const course = {
        name: this.state.name,
        type: "interne",
        imageUrl: image,
        classeId: this.state.classe,
        author: "5cbcace79da51fa9b94494fd"
      };
      console.log(course);
      const requestBody = {
        query: `
            mutation {
              addCourse(
                input: {
                  name: "${course.name}"
                  type: "${course.type}"
                  imageUrl: "${course.imageUrl}"
                  classeId: "${course.classeId}"
                  author: "${course.author}"
                }
              ) {
                id
                name
                type
              }
            }
        `
      };
      const res = await fetch("http://localhost:4000/", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res.data);
      this.setState({
        alert: <Alert color="success">Cours ajouter avec succés</Alert>
      });
      return null;
    }

    return this.setState({
      alert: <Alert color="danger">{this.state.error}</Alert>
    });
  };
  handleChange = selectorFiles => {
    this.setState({ image: selectorFiles });
  };
  handleSelect = async event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  closeAlert = () => {
    this.setState({ alert: null });
  };
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>course Form</strong>
            <div onClick={this.closeAlert}>{this.state.alert}</div>
          </CardHeader>
          <CardBody>
            <Form
              action=""
              method="post"
              encType="multipart/form-data"
              className="form-horizontal"
              onSubmit={this.handleSubmit}
              ref={form => (this.form = form)}
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
                    placeholder="Text"
                    onChange={this.handleSelect}
                  />
                  <FormText color="muted">course Name</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="image">Image</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="file"
                    id="image"
                    name="image"
                    placeholder="Text"
                    onChange={e => this.handleChange(e.target.files[0])}
                  />
                  <FormText color="muted">
                    Image to be displayed in the index
                  </FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label for="classe">Classes</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="select"
                    name="classe"
                    id="classe"
                    onChange={this.handleSelect}
                  >
                    <GetCategorie />
                  </Input>
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
