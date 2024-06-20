import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_QUESTION_DETAIL_QUERY, NEW_VOTE_MUTATION } from "./queries";

import {
  Button,
  Container,
  Heading,
  Progress,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import uniqid from "uniqid";

function QuestionDetail() {
  const [optionValue, setOptionValue] = useState("");

  const { id } = useParams();

  const { data, error, loading } = useQuery(GET_QUESTION_DETAIL_QUERY, {
    variables: {
      id: id,
    },
  });

  const [newVote, { called, loading: voteLoading }] = useMutation(
    NEW_VOTE_MUTATION,
    {
      variables: {
        data: {
          option_id: optionValue,
          question_id: id,
        },
      },
    }
  );

  const handleClickNewVote = () => {
    newVote();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { question } = data;

  const totalVotes = question.total;

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
                isDisabled={voteLoading || called}
                colorScheme="green"
                onChange={setOptionValue}
                value={optionValue}
              >
                <Radio value={option.id} display="block" size="lg">
                  {option.text}
                  <span>
             -------- Active vote for {option.text}: (
                 {(
                   (question.votes.filter(
                     (vote) => vote.option.id === option.id
                   ).length *
                     100) /
                   totalVotes
                 ).toFixed(2) + "%"}
                 )
              
               </span>
                  
                </Radio>
               
              </RadioGroup>
             
              {called && (
               
               <span>
               {option.text}: 
                 &nbsp;
                 (
                 {(
                   (question.votes.filter(
                     (vote) => vote.option.id === option.id
                   ).length *
                     100) /
                   totalVotes
                 ).toFixed(2) + "%"}
                 )
                 <Progress mt="2" colorScheme="green" value={(
                   (question.votes.filter(
                     (vote) => vote.option.id === option.id
                   ).length *
                     100) /
                   totalVotes
                 ).toFixed(2)} />
               </span>
               
             )}

            </div>
          );
        })}
      {!called && (
        <Button
        onClick={handleClickNewVote}
        disabled={voteLoading}
        ml="15px"
        colorScheme="green"
        size="lg"
      >
        Vote
      </Button>
      )}
    </div>
  );
}

export default QuestionDetail;
