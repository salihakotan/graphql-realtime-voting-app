import { gql } from "@apollo/client";

export const GET_QUESTIONS_QUERY = gql`
query getQuestions{
  questions{
    id,
    total,
    title,
    options{id,text
      question_id,
      ,question{title}}
    votes{id,question{title}, option{text}}
  }
}
`

