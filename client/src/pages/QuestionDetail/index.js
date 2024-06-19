import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import { GET_QUESTION_DETAIL_QUERY } from './queries'
import { Container, Heading } from '@chakra-ui/react'

function QuestionDetail() {

    
    const {id} = useParams()

    const {data,error,loading} = useQuery(GET_QUESTION_DETAIL_QUERY,{
        variables:{
            id:id
        }
    })


    
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  const {question} = data


  return (
    <div>
        <Heading mt="30px" mb="30px" as="h1">{question.title}</Heading>

            {
                question.options && (
                    question.options.map((option,i)=> {
                        return <div key={i} className='optionItem'>

                            {option.text}

                        </div>
                    })
                )
            }



    </div>
  )
}

export default QuestionDetail