import React from "react";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const GetCategories = () => (
  <Query
    query={gql`
      query {
        classes {
          id
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <option>chargement ...</option>;
      if (error) return <option>Error :(</option>;

      return data.classes.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ));
    }}
  </Query>
);

export default GetCategories;
