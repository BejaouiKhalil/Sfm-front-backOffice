import React, { Component } from 'react';
import axios from "axios";
import { Badge, Card, CardBody,CardHeader ,Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

import { Link } from "react-router-dom";

class Quiz extends Component {
    
    constructor(props){
      super(props);
      this.state= {quizs : [] , demands :[]}
      this.onClick=this.onClick.bind(this);
      this.onClick1=this.onClick1.bind(this);
}
    
    componentWillMount() {
        axios.get(`http://localhost:3001/quizss/`)
          .then(response => this.setState({ quizs: response.data }));
          axios.get(`http://localhost:3001/demands`)
          .then(response => this.setState({ demands: response.data }));
  }

        onClick(id) {
         let response=  fetch(`http://localhost:3001/daccept/${id}` , {
              method: 'POST',
              headers:{ 
                  'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({})
                    }).then(res=> this.componentWillMount());    
                    }
       
          onClick1(matiere) {
            fetch(`http://localhost:3001/delquiz/${matiere}`)
            .then(res=> this.componentWillMount());
          }
   
    render() { 
    return (
    <>
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
                <CardHeader>
                    List of quizs :
                </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Subject</th>
                    <th>Level</th>
                    <th>Added By</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
    {this.state.quizs.map(quiz => 
                      <tr>
                    <td>{quiz.titre}</td>
                    <td>{quiz.matiere}</td>
                    <td>{quiz.type}</td>
                    <td>{quiz.auteur.name}</td>
                    <td>
                    <Link to={"/quizs/" + quiz._id}>
             <button className="btn btn-info"> View</button>  </Link>       
     <button className="btn btn-danger " onClick={this.onClick1.bind(this.onClick1,quiz._id)}>Delete</button>
                    
                    </td>
                  </tr>
                 
                          ) }
                </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
                <CardHeader>
                    List of requests to pass quiz  :
                </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                  <th>Quiz</th>
                    <th>Subject</th>
                    <th>Added by</th>
                    <th>Learner</th>
                    <th>State</th> 
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
  {this.state.demands.map(demand =>   
        <tr>      
        <td>{demand.quiz.titre}</td>
        <td> {demand.quiz.matiere}</td> 
       <td>{demand.quiz.auteur.name}</td>
        <td>{demand.learner.name}</td>
        {demand.result ? (<> 
      <td>  <Badge color="success">Approved</Badge></td>
      <td></td> </> 
      ):(<>        
      <td><Badge color="warning">Pending</Badge></td>
      <td><button className="btn btn-danger" onClick={this.onClick.bind(this.onClick,demand._id)} > Approve Permission </button> </td> 
    </>  )} 
    </tr>)}
            </tbody>
                </Table>
               
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

   </> )
    }
}

export default Quiz;
