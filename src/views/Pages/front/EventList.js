import React, { Component } from 'react';
import {Card,CardHeader , CardBody, CardFooter, Col, Container, Row } from 'reactstrap';
import  EventCard  from "./eventCard";
import axios from "axios";

class EventList extends Component {
    constructor(props) {
        super(props);
        this.state={
            error: null,
            isLoaded: false,
            items: []
        }
    }
    
    componentDidMount() {
        axios.get("http://localhost:3000/events/getAllEvents").then(
            result => {
                let items=result.data;
                var sorted_items = items.sort((a,b) => {
                    return new Date(a.startDate).getTime() - 
                        new Date(b.startDate).getTime()
                });
              this.setState({
                isLoaded: true,
                items: sorted_items
              });
            },
            error => {
              this.setState({
                isLoaded: true,
                error
              });
            }
            );
        
    }
    render(){
        const { error, isLoaded, items } = this.state;

        return(
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                Update Events :
                            </CardHeader>
                            <CardBody>
                            <Row>
                            {items.map(item => (
                                <EventCard 
                                    event={item}
                                />
                            ))}
                            </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>    

        );
    }

}
export default EventList;
