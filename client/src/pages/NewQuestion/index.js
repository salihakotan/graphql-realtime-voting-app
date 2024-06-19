import { useMutation } from "@apollo/client";
import { AbsoluteCenter, Box, Button, Container, Divider, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { NEW_QUESTION_MUTATION } from "./queries";

function NewQuestion() {
  const [question, setQuestion] = useState("");

  const [addQuestion, { loading }] = useMutation(NEW_QUESTION_MUTATION, {
    variables: {
      data: {
        title: question,
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
      bgColor="#f5b9ff"
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
