import { useQuery, gql } from '@apollo/client';

export const GET_INITIATIVES = gql`
  query Initiatives {
    initiative(order_by: { updated_at: desc }) {
      id
      name
      title
      description
    }
  }
`;

const GetInitiatives = () => {
  return useQuery(GET_INITIATIVES, {
    fetchPolicy: 'no-cache',
  });
};

export default GetInitiatives;
