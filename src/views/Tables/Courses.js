import React, { Component } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from "reactstrap";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

class Courses extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Liste of courses : <br />
                <Link to="/course/new">Add new course</Link>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Author</th>
                      <th>Type</th>
                      <th>Class</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <Query
                      query={gql`
                        query {
                          courses {
                            id
                            name
                            type
                            imageUrl
                            classe {
                              name
                            }
                            author {
                              name
                            }
                          }
                        }
                      `}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return <span>Chargement ...</span>;
                        if (error) return <p>Error :(</p>;

                        return data.courses.map(
                          ({ name, type, imageUrl, classe, author }) => (
                            <tr>
                              <td>{name}</td>
                              <td>{author && author.name}</td>
                              <td>{type}</td>
                              <td>{classe && classe.name}</td>
                              <td>
                                <Badge color="success">Active</Badge>
                              </td>
                              <td>
                                <ul>
                                  <li>
                                    <a>View</a>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          )
                        );
                      }}
                    </Query>
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem>
                      <PaginationLink previous tag="button">
                        Prev
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag="button">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink next tag="button">
                        Next
                      </PaginationLink>
                    </PaginationItem>
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
