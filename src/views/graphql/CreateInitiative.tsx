import { gql, useMutation } from '@apollo/client';

const CreateInitiative = () => {
  const createInitiativeQuery = gql`
    mutation CreateInitiative(
      $name: String!
      $title: String!
      $description: String!
      $category: Int!
      $department: Int!
      $author_id: String!
      $author_name: String!
      $author_email: String!
    ) {
      insert_initiative_one(
        object: {
          category: $category
          department: $department
          description: $description
          author_details: {
            data: { id: $author_id, name: $author_name, email: $author_email }
            on_conflict: { constraint: users_pkey, update_columns: [name, email] }
          }
          name: $name
          title: $title
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
