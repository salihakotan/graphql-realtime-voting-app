import { gql } from "@apollo/client";

export const GET_QUESTIONS_QUERY = gql`
query getQuestions{
  questions{
    id,
    title,
    options{text}
  }
}
`

export const GET_VOTES_QUERY = gql`
query getVotes{
  votes{
    question_id,
    option_id,
    }
}
`