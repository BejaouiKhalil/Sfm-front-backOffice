import React, { Component } from 'react';
import { Badge, Card, CardBody,CardHeader ,Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class Courses extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
                <CardHeader>
                    Liste of Courses :
                </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Class</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Java for beginner</td>
                    <td>this courseis for test</td>
                    <td>Interne</td>
                    <td>Java</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                    <td>
                      <ul>
                        <li><a>View</a></li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>Java for experts</td>
                    <td>this courseis for test</td>
                    <td>externe</td>
                    <td>Java</td>
                    <td>
                      <Badge color="warning">Pending</Badge>
                    </td>
                    <td>
                      <ul>
                        <li><a>View</a></li>
                      </ul>
                    </td>
                  </tr>
                  
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

export default Courses;
