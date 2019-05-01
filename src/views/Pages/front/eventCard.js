import React, { Component } from 'react';
import { Button ,Row } from 'reactstrap';

import './styleCard.css'
import { throws } from 'assert';
class EventCard extends Component {
    constructor(props) {
        super(props);
        this.state={}
    }
    
    componentDidMount() {
       console.log(this.props)
    }
    render(){


        return(
            <div className="card-event">
                <img src={this.props.event.pathPicture} alt="Avatar" style={{width: '100%'}} />
                <div className="container">
                    <h4>{this.props.event.name}</h4> 
                    <p>{this.props.event.description}</p> 
                    <Row>
                    <div className="button-event">
                        <Button color="secondary">Interest</Button>
                        <Button color="primary">Participate</Button>
                    </div>
                    </Row>
                </div>

             </div>


        );
    }

}
export default EventCard;