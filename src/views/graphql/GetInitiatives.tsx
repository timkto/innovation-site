import { useQuery, gql } from '@apollo/client';

export const GET_INITIATIVES = gql`
  query Initiatives {
    initiatives(order_by: { updated_at: desc }) {
      id
      title
      screen_name
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
