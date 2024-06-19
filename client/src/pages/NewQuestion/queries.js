import { gql } from "@apollo/client";

export const NEW_QUESTION_MUTATION = gql`

mutation newQestion($data:NewQuestionInput!){
  newQuestion(data:$data){
    id,
    title,
   
    options{
    id,text
  }
  }
}
`