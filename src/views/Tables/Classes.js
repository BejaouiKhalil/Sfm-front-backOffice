import React, { Component } from "react";
import {
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
import Moment from "react-moment";

class classes extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Liste of classes : <br />
                <Link to="/class/new">Add new class</Link>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>inserted at</th>
                      <th>Last Update</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <Query
                      query={gql`
                        query {
                          classes {
                            id
                            name
                            description
                            createdAt
                            imageUrl
                            lastupdate
                          }
                        }
                      `}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return <span>Chargement...</span>;
                        if (error) return <p>Error :(</p>;

                        return data.classes.map(
                          ({
                            name,
                            description,
                            createdAt,
                            imageUrl,
                            lastupdate
                          }) => (
                            <tr>
                              <td>{name} </td>
                              <td>{description}</td>
                              <td>
                                <Moment unix>{createdAt}</Moment>
                              </td>
                              <td>
                                <Moment unix>{lastupdate}</Moment>
                              </td>
                              <td>
                                <ul>
                                  <li>
                                    <a>View</a>
                                  </li>
                                  <li>
                                    <a>Edit</a>
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

export default classes;
