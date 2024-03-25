/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent, useState } from 'react';
// import { useDispatch } from 'react-redux';

// import { operationsSlice } from 'state/operations/operationsSlice';
import { XZ_REGEX } from 'constants/constants';
import Breadcrumbs from 'components/Breadcrumbs';

import {
  Container,
  Content,
  Title,
  Block,
  TableWrapper,
  Table,
  TableHead,
  TableBody,
  TableH,
  HText,
  TableD,
  TableIdText,
  TableInputText,
  TableInputLabel,
  TableDivision,
  AddBtn,
  DeleteBtn,
  TableDContent,
  TableInputTextLabeled,
  TableSelect,
  TableSelectOption,
} from './style';

const breadcrumbsItems = [
  {
    label: 'Grupo de Trabalho',
    url: '/workgroup',
    isActive: false,
  },
  {
    label: 'Operation',
    url: '/operation',
    isActive: true,
  },
];

const initialState = {
  activities: [
    {
      id: 3,
      xaxis: '',
      zaxis: '31',
      fvalue: '',
      tvalue: '',
      actionValue: 'action2',
      aParamValue: '46.23',
      aParamId: 'x',
      bParamValue: '46.23',
      bParamId: 'z',
      cParamValue: '46.23',
      cParamId: 'a',
    },
  ],
};

const Operation: React.FC = () => {
  const [formData, setFormData] = useState({
    ...initialState,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
  ) => {
    const { value } = e.currentTarget;
    if (value.match(XZ_REGEX) || value === '') {
      setFormData({
        ...formData,
        activities: formData.activities.map((item, i) => {
          if (i === index) {
            return { ...item, [e.currentTarget.name]: value };
          }
          return item;
        }),
      });
    }
  };

  return (
    <Container>
      <Breadcrumbs items={breadcrumbsItems} />
      <Content>
        <Title>Operação</Title>
        <Block>
          <TableWrapper>
            <form
              name="activity-items-table"
              className="activity-items-table"
              // onSubmit={handleSubmit}
            >
              <Table className="table table-ordenation">
                <TableHead className="table-ordenation head">
                  <tr>
                    <TableH />
                    <TableH />
                    <TableH>
                      <HText>X</HText>
                    </TableH>
                    <TableH>
                      <HText>Z</HText>
                    </TableH>
                    <TableH>
                      <HText>F</HText>
                    </TableH>
                    <TableH>
                      <HText>Ação</HText>
                    </TableH>
                    <TableH />
                    <TableH />
                    <TableH />
                    <TableH />
                    <TableH />
                  </tr>
                </TableHead>
                <TableBody>
                  {formData.activities.map((item, index) => (
                    <tr>
                      <TableD>
                        <AddBtn type="button" className="icon-add" />
                      </TableD>
                      <TableD>
                        <TableIdText>{item.id}</TableIdText>
                      </TableD>
                      <TableD>
                        <TableInputText
                          className="input is-edit"
                          type="text"
                          name="xaxis"
                          value={item.xaxis}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </TableD>
                      <TableD>
                        <TableInputText
                          className="input is-edit"
                          type="text"
                          name="zaxis"
                          value={item.zaxis}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </TableD>
                      <TableD>
                        <TableInputText
                          className="input is-edit"
                          type="text"
                          name="fvalue"
                          value={item.fvalue}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </TableD>
                      <TableD>
                        <TableSelect
                          className="input is-edit"
                          name="actionValue"
                          value={item.actionValue}
                          onChange={(e) => handleChange(e, index)}
                        >
                          <TableSelectOption value="">
                            Selecione...
                          </TableSelectOption>
                          <TableSelectOption value="action1">
                            Ação 1
                          </TableSelectOption>
                          <TableSelectOption value="action2">
                            Ação 2
                          </TableSelectOption>
                          <TableSelectOption value="action3">
                            Ação 3
                          </TableSelectOption>
                        </TableSelect>
                      </TableD>
                      <TableD>
                        <TableDivision>|</TableDivision>
                      </TableD>
                      {item.aParamValue || item.aParamValue === '' ? (
                        <TableD>
                          <TableDContent>
                            <TableInputLabel>{item.aParamId}</TableInputLabel>
                            <TableInputTextLabeled
                              className="input is-edit"
                              type="text"
                              name="aParamValue"
                              value={item.aParamValue}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </TableDContent>
                        </TableD>
                      ) : (
                        <TableD />
                      )}
                      {item.bParamValue || item.bParamValue === '' ? (
                        <TableD>
                          <TableDContent>
                            <TableInputLabel>{item.bParamId}</TableInputLabel>
                            <TableInputTextLabeled
                              className="input is-edit"
                              type="text"
                              name="bParamValue"
                              value={item.bParamValue}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </TableDContent>
                        </TableD>
                      ) : (
                        <TableD />
                      )}
                      {item.cParamValue || item.cParamValue === '' ? (
                        <TableD>
                          <TableDContent>
                            <TableInputLabel>{item.cParamId}</TableInputLabel>
                            <TableInputTextLabeled
                              className="input is-edit"
                              type="text"
                              name="cParamValue"
                              value={item.cParamValue}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </TableDContent>
                        </TableD>
                      ) : (
                        <TableD />
                      )}
                      <TableD>
                        <DeleteBtn type="button" className="icon-delete" />
                      </TableD>
                    </tr>
                  ))}
                </TableBody>
              </Table>
            </form>
          </TableWrapper>
        </Block>
      </Content>
    </Container>
  );
};

export default Operation;
