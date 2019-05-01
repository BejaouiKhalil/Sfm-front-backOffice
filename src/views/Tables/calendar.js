import React, { Component } from 'react';
import { Card, CardBody,CardHeader ,Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap'; 
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
import axios from "axios";
import 'react-big-scheduler/lib/css/style.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import withDragDropContext from './test'
import BigCalendar from 'react-big-calendar'
import events from './eventss'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
    state={
        evt:[],
        modal:false,
        selectedEvent:{},
        startDate:new Date(),
        endDate:new Date()
    }
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onSelectEvent = this.onSelectEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    onSelectEvent(event,e){
        this.setState(prevState => ({
            modal: !prevState.modal,
            selectedEvent:{
                name:event.title,
                description:event.description
            },
            startDate:event.start,
            endDate:event.end
          }));
        console.log(event);
    }
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    componentDidMount() {
    const events=[];
    axios.get("http://localhost:3000/events/getAllEvents").then(
        result => {
         let evts=result.data;
         evts.forEach(element => {
             let e ={
                 id:element._id,
                title:element.name,
                description:element.description,
                start:new Date(element.startDate),
                end:new Date(element.endDate)
             }
             console.log(e)
             events.push(e);
         });
         this.setState({
            evt:events
        })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
        );
    this.setState({
        evt:events
    })
    }
    handleChange(date) {

      }


    
  render() {
return(
<div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
                <CardHeader>
                    Calendar :
                </CardHeader>
              <CardBody>
<div>
<BigCalendar
localizer={localizer}
            events={this.state.evt}
            defaultView='week'
            views={['month','week','day']}
            defaultDate={new Date()}
            onSelectEvent={this.onSelectEvent}
          />
<Modal isOpen={this.state.modal} >
          <ModalHeader toggle={this.toggle}>{this.state.selectedEvent.name}</ModalHeader>
          <ModalBody>
                {this.state.selectedEvent.description}
                <br/>
                <DatePicker
                    inline
                    selected={this.state.endDate}
                    selectsEnd
                    onChange={this.handleChange}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                />
                
                
            </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
  </div>
  </CardBody>
            </Card>
          </Col>
        </Row>
      </div>)

  
  }
}


export default withDragDropContext(Calendar);
