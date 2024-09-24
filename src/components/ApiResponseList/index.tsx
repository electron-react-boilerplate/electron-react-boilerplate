import React from 'react';
import { useSelector } from 'react-redux';

import { getContourNameByProgramCode } from 'integration/getContourNameByProgramCode';

import mock from 'mockdata/pt-br/apiResponse.json';

import { ResponseDataItem } from 'types/api';
import { ApiResponseListProps, ResultItem, Results } from './interface';

import {
  Container,
  List,
  ListItem,
  Name,
  ProgramCode,
  Result,
  ResultDescription,
} from './style';

function getResultDescription(
  mockResponses: Results,
  result: string,
  resultDescription: string,
): any {
  const foundItem = mockResponses.find(
    (item: ResultItem) => item.result === result,
  );
  if (foundItem) return foundItem.resultDescription;
  return resultDescription;
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
          <React.Fragment key={item.programCode}>
            {item.result !== 'DownloadSuccess' && (
              <ListItem>
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
                <ResultDescription>
                  {getResultDescription(
                    mock.responses,
                    item.result,
                    item.resultDescription,
                  )}
                </ResultDescription>
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default ApiResponseList;
