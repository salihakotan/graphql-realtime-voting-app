import React from "react";
import { GET_QUESTIONS_QUERY } from "./queries";
import { useQuery } from "@apollo/client";
import {
  TableContainer,
  Tr,
  Td,
  Thead,
  Tfoot,
  TableCaption,
  Table,
  Th,
  Tbody,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Home() {
  const { data, error, loading } = useQuery(GET_QUESTIONS_QUERY);


  const navigate = useNavigate()

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { questions } = data;



  const handleRowClick = (question) => {
    navigate(`/questions/${question.id}`)
  }



  return (
    <div>
      <TableContainer>
        <Table variant="striped" colorScheme="yellow">
          <Thead>
            <Tr>
              <Th>Questions</Th>
              <Th isNumeric>Total votes</Th>
            </Tr>
          </Thead>
          <Tbody>


            {questions && !loading && (questions.map((question,i) => {
                return  <Tr key={i} onClick={()=> handleRowClick(question)}>
                  <Td>{question.title}</Td>
                  <Td isNumeric>{question.total}</Td>
                </Tr>
              }))
              }
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Home;
