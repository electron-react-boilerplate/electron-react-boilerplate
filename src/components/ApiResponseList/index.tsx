import React from 'react';
import { useSelector } from 'react-redux';

import { getContourNameByProgramCode } from 'integration/getContourNameByProgramCode';

import { Part } from 'types/part';
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
  const part = useSelector((state: { part: Part }) => state.part);

  return (
    <Container>
      <List>
        {data.map((item: ResponseDataItem) => (
          <ListItem key={item.programCode}>
            <ProgramCode>
              {item.programCode}:{' '}
              <Name>
                {getContourNameByProgramCode(
                  part,
                  Number(item.programCode.replace('O', '')),
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
