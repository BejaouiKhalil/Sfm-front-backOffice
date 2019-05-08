import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
	withRouter
} from 'react-router-dom';
import { Badge, Card, CardBody,CardHeader ,Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';


class QuizDetail extends Component{
   
      constructor(props) {
        super(props);
        this.state = { };
      }
      componentWillMount() {
        axios.get(`http://localhost:3001/quiz/${this.props.match.params.id}`)
          .then(response => this.setState({ product: response.data }));
      }
  

      render() {
        if (!this.state.product) {
          return null;
        }
    return (
        <>
        <div className="animated fadeIn">
        <Card>
        <h1>{this.state.product.titre}</h1>
        {this.state.product.matiere} 
                      {this.state.product.questions.map(review => (
                        <>
                          <h3>Question :{review.description}</h3>
                            {review.reponses.map(r => (
                                <>
                              <h5> Response : {r.description} </h5>
                              
                                </>
                            ))} <br/>
                            </>))}
                            </Card>



                            </div>
        </>
    )}


}


export default withRouter(QuizDetail) ;