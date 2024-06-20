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

export const NEW_OPTIONS_MUTATION = gql`
mutation newOption($data:NewOptionsInput!){
  newOptions(data:$data) 
  {id,text,question_id,question{title}}
}
`