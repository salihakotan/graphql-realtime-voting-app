import { gql } from "@apollo/client";

export const GET_QUESTION_DETAIL_QUERY = gql`
query getQuestion($id:ID!){
  question(id:$id){
    id,
    title,
    options{id,text}
  }
}
`