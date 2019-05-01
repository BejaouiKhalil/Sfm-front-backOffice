//https://api.cloudinary.com/v1_1/ddiv4viqj/image/upload
import React, { Component } from 'react';
import {Card,CardHeader , CardBody, CardFooter, Col, Container, Input,Button, Form, FormGroup, Label, FormText, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class UpdateEvent extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            file: null,
            startDate:new Date(),
            endDate:new Date(),
            id:'',
            name:'',
            description:'',
            lieu:'',
            maxNum:0,
            path:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleLieuChange = this.handleLieuChange.bind(this);
        this.handleMaxNumChange = this.handleMaxNumChange.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        
    }

    componentDidMount() {
    }
 
    fileSelecterHandler= event=>{
        this.setState({
            file:event.target.files[0]
        })
    }
    fileUploadHandler =async ()=>{
        const data = new FormData();
        let image;
      data.append("file", this.state.file);
      data.append("upload_preset", "xbjk5axd");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/ddiv4viqj/image/upload",
        {
          method: "POST",
          body: data
        }
      );
      const file = await res.json();
      console.log(file);
      if (!file.error) {
          
        image= file.secure_url;
      } 
      console.log(image)
      const event ={
          
        name:this.state.name,
        description:this.state.description,
        lieu:this.state.lieu,
        maxNum:this.state.maxNum,
        pathPicture:file.secure_url,
        startDate:this.state.startDate,
        endDate:this.state.endDate
      }
      console.log(event)
      axios.post('http://localhost:3000/events/addEvent/',  event )
      .then(res => {
        this.props.history.push('/Events')
        console.log(res);
        console.log(res.data);
      })
  
    }
    handleChange(date) {
        if((new Date(date).getTime() - new Date(this.state.endDate).getTime())>0){
            alert("Start Date should be superior than End Date")
            return
        }
        this.setState(prevState=>({
          startDate: date
        }));
      }
    handleChange1(date) {
        
        if((new Date(this.state.startDate).getTime() - new Date(date).getTime())>0){
            alert("Start Date should be superior than End Date")
            return;
        }
        
        this.setState(prevState=>({
          endDate: date
          
        }));
      }
      handleNameChange = (e) => this.setState({ name: e.target.value })
      handleDescriptionChange = (e) => this.setState({ description: e.target.value })
      handleLieuChange = (e) => this.setState({ lieu: e.target.value })
      handleMaxNumChange = (e) => this.setState({ maxNum: e.target.value })

    render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
                <CardHeader>
                    Add Event :
                </CardHeader>
              <CardBody>
              <Form>
                          <FormGroup>
                            <Label for="Name">Name</Label>
                            <Input type="text" name="Name" id="exampleEmail" placeholder="Name"  onChange={this.handleNameChange} />
                          </FormGroup>
                          <FormGroup>
                            <Label for="Description">Description</Label>
                            <Input type="text" name="Description" id="exampleEmail" placeholder="Description" onChange={this.handleDescriptionChange} />
                          </FormGroup>
                          <FormGroup>
                            <Label for="Lieu">Lieu</Label>
                            <Input type="text" name="Lieu" id="exampleEmail" placeholder="Lieu"   onChange={this.handleLieuChange}/>
                          </FormGroup>
                          <FormGroup>
                            <Label for="max">max Num</Label>
                            <Input type="number" name="max" id="exampleEmail" placeholder="max Num"  onChange={this.handleMaxNumChange} />
                          </FormGroup>
                         
                          <FormGroup>
                          <Label >Start Date</Label>
                          <DatePicker
                          selected={this.state.startDate}
                          onChange={this.handleChange}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          dateFormat="dd/MM/YYYY h:mm aa"
                          timeCaption="time"
                          /> 
                          </FormGroup>
                          <FormGroup>
                          <Label >End Date</Label>
                          <DatePicker
                          selected={this.state.endDate}
                          onChange={this.handleChange1}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          dateFormat="dd/MM/YYYY h:mm aa"
                          timeCaption="time"
                          />     
                          </FormGroup>
                          <FormGroup>
                            <Label for="file">Upload Image</Label>
                            <Input type="file" name="max" id="exampleEmail"onChange={this.fileSelecterHandler} />
                          </FormGroup>
                          <FormGroup>
                          <Button onClick={this.fileUploadHandler}>Add Event</Button>    
                          </FormGroup>
                        </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default UpdateEvent;
