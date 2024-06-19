import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_QUESTION_DETAIL_QUERY, NEW_VOTE_MUTATION } from "./queries";
import {
  Button,
  Container,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import uniqid from "uniqid"

function QuestionDetail() {
  const [optionValue, setOptionValue] = useState("");

  const { id } = useParams();

  const { data, error, loading }= useQuery(GET_QUESTION_DETAIL_QUERY, {
    variables: {
      id: id,
    },
  });


  


  const [newVote,{loading:voteLoading}] = useMutation(NEW_VOTE_MUTATION, {
    variables:{
        data:{
        option_id:optionValue,
        question_id:id
        }
    }
  })


  const handleClickNewVote = () => {
    newVote()
    console.log("vote successfully saved ")
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { question } = data;

  return (
    <div>
      <Heading mt="30px" mb="30px" as="h1">
        {question.title}
      </Heading>

      {question.options &&
        question.options.map((option, i) => {
          return (
            <div key={i} className="optionItem">
              <RadioGroup
              disabled={voteLoading}
                colorScheme="green"
                onChange={setOptionValue}
                value={optionValue}
              >
                <Radio
                  value={option.id}
                  display="block"
                  size="lg"
                >
                  {option.text}
                </Radio>
              </RadioGroup>
              {console.log("value", optionValue)}
            </div>
          );
        })}

      <Button onClick={handleClickNewVote} disabled={voteLoading} ml="15px" colorScheme="green" size="lg">
        Vote
      </Button>
    </div>
  );
}

export default QuestionDetail;
