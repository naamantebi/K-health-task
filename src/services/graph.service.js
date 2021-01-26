import gql from 'graphql-tag';

export const Graph = () => {
    return {
        getInfo: gql`{
  headers {
    header_id
    header_name
  }
  rows {
    row_id
  }
  values {
    header_id
    row_id
    value
  }
}
  `,
        updateValue: gql`
  mutation Update($header_id: Int!, $value: String!, $row_id: Int!) {
    update(header_id: $header_id, value: $value, row_id: $row_id) {
      value
    }
  }
`
    };
};
