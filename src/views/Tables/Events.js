import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom'
import { Badge, Card, CardBody,CardHeader ,Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap'; 
const Classes = React.lazy(() => import('./Classes'));

class Events extends Component {
    constructor(props) {
        super(props);
      }
    state = {
        error: null,
        isLoaded: false,
        items: []
    };
    componentDidMount() {
        axios.get("http://localhost:3000/events/getAllEvents").then(
            result => {
              this.setState({
                isLoaded: true,
                items: result.data
              });
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
        
    }
    handleDeleteHref(id){
        axios.delete("http://localhost:3000/events/deleteEvent/"+id)
        .then(res => {
            window.location.reload();
        })

    }
    
  render() {
    const { error, isLoaded, items } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
                <CardHeader>
                    Liste of Events :
                </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>lieu</th>
                    <th>maxNum</th>
                    <th>startDate</th>
                    <th>action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {items.map(item => (
                    <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.lieu}</td>
                        <td>{item.maxNum}</td>
                        <td>{item.startDate}</td>
                        <td>
                            <a  
                                href="#"
                                onClick={() => this.handleDeleteHref(item._id)} >
                                Delete
                            </a >
                            |
                            <Link to={'/addEvent/'+item._id} activeClassName="active">Update</Link>
                            
                        </td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Events;
