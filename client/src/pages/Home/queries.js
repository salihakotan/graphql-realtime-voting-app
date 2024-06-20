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
    votes{id,question{title}, option{id,text}}
  }
}
`


export const QUESTION_ADDED_SUBSCRIPTION= gql`
subscription questionAdded{
  questionAdded{
    id,
    total,
    title,
    options{id,text
      question_id,
      ,question{title}}
    votes{id,question{title}, option{id,text}}
  }
}`