import { gql } from "@apollo/client";

export const GET_QUESTION_DETAIL_QUERY = gql`
query getQuestion($id:ID!){
  question(id:$id){
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


export const NEW_VOTE_MUTATION =gql`
mutation newVote($data:NewVoteInput!){
  newVote(data:$data) {
    id
    question_id,
    option_id
    question{
      id,
      title
    }
    option{text,id}
  }
}
`