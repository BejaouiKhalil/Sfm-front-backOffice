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
    }
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onSelectEvent = this.onSelectEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);

       /* let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week ,false, false, {
            schedulerWidth: '60%',
            schedulerMaxHeight: 500,
        });
        moment.locale('en');
        schedulerData.setLocaleMoment(moment);
        let resources = [
            {
            id: 'r1',
            name: 'Resource1'
            },
            {
            id: 'r2',
            name: 'Resource2'
            },
            {
            id: 'r3',
            name: 'Resource3'
            }   
        ];
        schedulerData.setResources(resources);
        let events = [
            {
                id: 1,
                start: '2019-04-21 09:30:00',
                end: '2019-04-22 23:30:00',
                resourceId: 'r1',
                title: 'I am finished',
                bgColor: '#D9D9D9'
            }, 
            {
                id: 2,
                start: '2019-04-21 04:30:00',
                end: '2019-04-26 23:30:00',
                resourceId: 'r2',
                title: 'I am not resizable',
                resizable: false
            }, 
            {
                id: 3,
                start: '2019-04-24 04:30:00',
                end: '2019-04-24 23:30:00',
                resourceId: 'r3',
                title: 'I am not movable',
                movable: false
            }, 
            {
                id: 4,
                start: '2019-04-25 14:30:00',
                end: '2019-04-25 23:30:00',
                resourceId: 'r1',
                title: 'I am not start-resizable',
                startResizable: false
            }, 
            {
                id: 5,
                start: '2019-04-27 15:30:00',
                end: '2019-04-27 23:30:00',
                resourceId: 'r2',
                title: 'R2 has recurring tasks every week on Tuesday, Friday',
                rrule: 'FREQ=WEEKLY;DTSTART=20190419T013000Z;BYDAY=TU,FR',
                bgColor: '#f759ab'
            }
        ];/*
        schedulerData.setEvents(events);
        this.state = {
            schedulerData: schedulerData
        }*/
        

}
    /*prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(schedulerData.events);
        this.setState({
            schedulerData: schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(schedulerData.events);
        this.setState({
            schedulerData: schedulerData
        })
    }
    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(schedulerData.events);
        this.setState({
            schedulerData: schedulerData
        })
    }
    
    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(schedulerData.events);
        this.setState({
            schedulerData: schedulerData
        })
    }*/
    onSelectEvent(event,e){
        this.setState(prevState => ({
            modal: !prevState.modal,
            selectedEvent:{
                name:event.title,
                description:event.description
            }
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
        this.setState(prevState=>({
          startDate: date
        }));
      }

    
  render() {
return(
<div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
                <CardHeader>
                    Liste of Events :
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
                    <DatePicker
            selected={new Date()}
            selectsStart
            onChange={this.handleChange}
            readOnly={true}
            startDate={this.state.selectedEvent.startDate}
            endDate={this.state.selectedEvent.endDate}
        />

        <DatePicker
            selected={new Date()}
            selectsEnd
            onChange={this.handleChange}
            readOnly={true}
            startDate={this.state.selectedEvent.startDate}
            endDate={this.state.selectedEvent.endDate}
        />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
  </div>
  </CardBody>
            </Card>
          </Col>
        </Row>
      </div>)
     /* 
    const {schedulerData} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
                <CardHeader>
                    Liste of Events :
                </CardHeader>
              <CardBody>
              
<Scheduler schedulerData={schedulerData}
           prevClick={this.prevClick}
           nextClick={this.nextClick}
           onSelectDate={this.onSelectDate}
           onViewChange={this.onViewChange}
           eventItemClick={this.eventClicked}
/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );*/

  
  }
}


export default withDragDropContext(Calendar);
