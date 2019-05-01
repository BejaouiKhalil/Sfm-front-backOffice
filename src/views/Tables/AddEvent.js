import React, { Component } from 'react';
import {Card,CardHeader , CardBody, CardFooter, Col, Container, Input,Button, Form, FormGroup, Label, FormText, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from "axios";
import DatePicker from "react-datepicker";
import { withRouter } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";
  class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        //this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleLieuChange = this.handleLieuChange.bind(this);
        this.handleMaxNumChange = this.handleMaxNumChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
      }
    state = {
        error: null,
        isLoaded: false,
        startDate:new Date(),
        endDate:new Date(),
        id:'',
        name:'',
        description:'',
        lieu:'',
        maxNum:0,
        path:''
    };
    handleChange(date) {
      if((new Date(date).getTime() - new Date(this.state.endDate).getTime())>0){
        alert("Start Date should be superior than End Date")
        return
    }
        this.setState(prevState=>({
          startDate: date,
          event:{
            ...prevState.event,
            startDate:date
          }
        }));
      }
    handleChange1(date) {
        
        if((new Date(this.state.startDate).getTime() - new Date(date).getTime())>0){
            alert("Start Date should be superior than End Date")
            return;
        }
        
        this.setState(prevState=>({
          endDate: date,
          event:{
            ...prevState.event,
            startDate:date
          }
        }));
      }
      handleNameChange = (e) => this.setState({ name: e.target.value })
      handleDescriptionChange = (e) => this.setState({ description: e.target.value })
      handleLieuChange = (e) => this.setState({ lieu: e.target.value })
      handleMaxNumChange = (e) => this.setState({ maxNum: e.target.value })

    componentDidMount() {
       
        axios.get(`http://localhost:3000/events/getEvent/`+this.props.match.params.id)
      .then(res => {
        const e = res.data;
        this.setState({ 
            path:e.pathPicture,
            name:e.name,
            description:e.description,
            lieu:e.lieu,
            maxNum:e.maxNum,
            id:e._id, 
            endDate:e.endDate,
            startDate: new Date(e.startDate)
        });
      })
    }
    handleBtnClick(){
      const event ={
        
        name:this.state.name,
        description:this.state.description,
        lieu:this.state.lieu,
        maxNum:this.state.maxNum,
        path:this.state.path,
        startDate:this.state.startDate,
        endDate:this.state.endDate
      }
      console.log(event)
      axios.put('http://localhost:3000/events/updateEvent/'+this.state.id,  event )
      .then(res => {
        this.props.history.push('/Events')
        console.log(res);
        console.log(res.data);
      })
  
    }
    render() {
        const { name, isLoaded, event } = this.state;
        console.log(event);
    return (
        <div className="animated fadeIn">
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            Update Event :
                        </CardHeader>
                        <CardBody>
                        <Form>
                          <FormGroup>
                            <Label for="Name">Name</Label>
                            <Input type="text" name="Name" id="exampleEmail" placeholder="Name"  value={this.state.name} onChange={this.handleNameChange} />
                          </FormGroup>
                          <FormGroup>
                            <Label for="Description">Description</Label>
                            <Input type="text" name="Description" id="exampleEmail" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange} />
                          </FormGroup>
                          <FormGroup>
                            <Label for="Lieu">Lieu</Label>
                            <Input type="text" name="Lieu" id="exampleEmail" placeholder="Lieu"  value={this.state.lieu} onChange={this.handleLieuChange}/>
                          </FormGroup>
                          <FormGroup>
                            <Label for="max">max Num</Label>
                            <Input type="number" name="max" id="exampleEmail" placeholder="max Num" value={this.state.maxNum} onChange={this.handleMaxNumChange} />
                          </FormGroup>
                          <FormGroup>
                          <Label >start Date</Label>
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
                          <Button onClick={this.handleBtnClick}>Update event</Button>
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
export default AddEvent;