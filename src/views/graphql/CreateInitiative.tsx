import { gql, useMutation } from '@apollo/client';

const CreateInitiative = () => {
  const createInitiativeQuery = gql`
    mutation CreateInitiative(
      $key: String!
      $title: String!
      $screen_name: String!
      $description: String!
      $category: Int!
      $department: Int!
      $link: String!
      $author_id: String!
      $author_name: String!
      $author_email: String!
    ) {
      insert_initiatives_one(
        object: {
          key: $key
          title: $title
          screen_name: $screen_name
          description: $description
          category: $category
          department: $department
          link: $link
          author_details: {
            data: { id: $author_id, name: $author_name, email: $author_email }
            on_conflict: { constraint: users_pkey, update_columns: [name, email] }
          }
        }
      ) {
        id
      }
    }
  `;

  const [createInitiative, { loading: createInitiativeLoading, error: createInitiativeError }] =
    useMutation(createInitiativeQuery);

  return { createInitiative, createInitiativeLoading, createInitiativeError };
};

export default CreateInitiative;
