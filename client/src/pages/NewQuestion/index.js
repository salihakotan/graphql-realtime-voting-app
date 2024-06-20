import { useMutation } from "@apollo/client";
import {
  AbsoluteCenter,
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { NEW_OPTIONS_MUTATION, NEW_QUESTION_MUTATION } from "./queries";
import uniqid from "uniqid";
import { useNavigate } from "react-router-dom";

import {message} from "antd"

function NewQuestion() {


    const navigate = useNavigate()

  const baseQuestionId = uniqid();

  const initialOptions = ["",""];

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(initialOptions);

  const [addQuestion, { loading }] = useMutation(NEW_QUESTION_MUTATION, {
    variables: {
      data: {
        id: baseQuestionId,
        title: question,
      },
    },
  });

  const [newOptions, { loading: optionsLoading }] = useMutation(
    NEW_OPTIONS_MUTATION,
    {
      variables: {
        data: {
          options: options,
          question_id: baseQuestionId,
        },
      },
    }
  );

  const handleClickedAddQuestion = () => {

    const filledOptions = options.filter((option)=> option.trim() !== "")

    if(filledOptions.length<2){
        message.error("Please add at least 2 options")
        return false
    }

    if(question.trim() === ""){
        message.error("Please enter a valid question title.")
        return false
    }

    setOptions(filledOptions)

    addQuestion();
    newOptions();
    message.success("Your question has been added successfully :)")
    navigate("/")
};

  const addOption = () => {
    setOptions([...options,""])
};


  return (
    <div>
      <Heading mt="10" mb="10" as="h1">
        New Question
      </Heading>

      <Input
        bgColor="#fbe5ff"
        size="lg"
        disabled={loading || optionsLoading}
        m="2"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter a question"
      />

      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          Options
        </AbsoluteCenter>
      </Box>
     

      {options &&
        options.map((option,i) => (
          <div key={i}>
            <Input
            onChange={(e)=> options[i]= e.target.value}
              variant="filled"
              disabled={loading || optionsLoading}
              m="2"
              placeholder="Enter an option..."
            />
          </div>
        ))}

      <Button
        disabled={loading || optionsLoading}
        onClick={addOption}
        colorScheme="purple"
        backgroundColor="#4229ff"
        m="2"
        size="lg"
      >
        Add New Option
      </Button>

      <Button
        disabled={loading || optionsLoading}
        onClick={handleClickedAddQuestion}
        colorScheme="purple"
        backgroundColor="#4229ff"
        m="2"
        size="lg"
      >
        Add Question
      </Button>
    </div>
  );
}

export default NewQuestion;
