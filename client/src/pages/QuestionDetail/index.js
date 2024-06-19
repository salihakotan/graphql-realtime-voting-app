import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_QUESTION_DETAIL_QUERY } from "./queries";
import {
  Button,
  Container,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

function QuestionDetail() {
  const [optionValue, setOptionValue] = useState("");

  const { id } = useParams();

  const { data, error, loading } = useQuery(GET_QUESTION_DETAIL_QUERY, {
    variables: {
      id: id,
    },
  });



//   const {loading:voteLoading} = useMutation()


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

      <Button ml="15px" colorScheme="green" size="lg">
        Vote
      </Button>
    </div>
  );
}

export default QuestionDetail;
