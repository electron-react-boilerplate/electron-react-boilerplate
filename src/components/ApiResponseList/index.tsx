import React from 'react';
import { ResponseData, ResponseDataItem } from 'types/api';
import {
  Container,
  List,
  ListItem,
  ProgramCode,
  Result,
  ResultDescription,
} from './style';

interface ApiResponseListProps {
  data: ResponseData;
}

const ApiResponseList: React.FC<ApiResponseListProps> = ({ data }) => {
  return (
    <Container>
      <List>
        {data.map((item: ResponseDataItem) => (
          <ListItem key={item.programCode}>
            <ProgramCode>{item.programCode}</ProgramCode>
            <Result>{item.result}</Result>
            <ResultDescription>{item.resultDescription}</ResultDescription>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ApiResponseList;
