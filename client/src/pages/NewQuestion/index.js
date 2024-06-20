import { useMutation } from "@apollo/client";
import { AbsoluteCenter, Box, Button, Container, Divider, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { NEW_QUESTION_MUTATION } from "./queries";


const initialOptions = [
    {
        id:"1",
        text:"Night",
        question_id:"1",
    },
    {
        id:"2",
        text:"Morning",
        question_id:"1",
    },
    {
        id:"3",
        text:"Both",
        question_id:"1",
    },
    {
        id:"4",
        text:"Tea",
        question_id:"2",
    },
    {
        id:"5",
        text:"Coffee",
        question_id:"2",
    },
]


function NewQuestion() {
  const [question, setQuestion] = useState("");

  const [addQuestion, { loading }] = useMutation(NEW_QUESTION_MUTATION, {
    variables: {
      data: {
        title: question,
        options:initialOptions
      },
    },
  });

  const addOption = () => {
    console.log("option input added")
  }

  return (
    <div>
      <Heading mt="10" mb="10" as="h1">
        New Question
      </Heading>

      <Input
      bgColor="#fbe5ff"
        size="lg"
        disabled={loading}
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

      <Input variant='filled' disabled={loading} m="2" placeholder="Enter an option..." />
      <Input variant='filled'  disabled={loading} m="2" placeholder="Enter an option..." />



      <Button
        disabled={loading}
        onClick={addOption}
        colorScheme="purple"
        backgroundColor="#4229ff"
        m="2"
        size="lg"
      >
        Add New Option
      </Button>


      <Button
        disabled={loading}
        onClick={addQuestion}
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
