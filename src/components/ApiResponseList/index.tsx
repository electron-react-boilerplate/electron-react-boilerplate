import React from 'react';
import { useSelector } from 'react-redux';

import { getContourNameByProgramCode } from 'integration/getContourNameByProgramCode';

import { ResponseData, ResponseDataItem } from 'types/api';

import {
  Container,
  List,
  ListItem,
  Name,
  ProgramCode,
  Result,
  ResultDescription,
} from './style';

interface ApiResponseListProps {
  data: ResponseData;
}

const ApiResponseList: React.FC<ApiResponseListProps> = ({ data }) => {
  const lastGeneratedCodes = useSelector(
    (state: { app: { lastGeneratedCodes: string[] } }) =>
      state.app.lastGeneratedCodes,
  );

  return (
    <Container>
      <List>
        {data.map((item: ResponseDataItem) => (
          <ListItem key={item.programCode}>
            <ProgramCode>
              {item.programCode}:{' '}
              <Name>
                {getContourNameByProgramCode(
                  lastGeneratedCodes,
                  item.programCode,
                )}
              </Name>
            </ProgramCode>
            <Result>{item.result}</Result>
            <ResultDescription>{item.resultDescription}</ResultDescription>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ApiResponseList;
