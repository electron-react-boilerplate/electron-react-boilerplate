/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

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

const formData = {
  activityItems: [
    { xaxis: '12', zaxis: '', fvalue: '', tvalue: '', action: '' },
    { xaxis: '', zaxis: '31', fvalue: '', tvalue: '', action: '' },
  ],
};

const Operation: React.FC = () => {
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
                  {formData.activityItems.map((item) => (
                    <tr>
                      <TableD>
                        <AddBtn type="button" className="icon-add" />
                      </TableD>
                      <TableD>
                        <TableIdText>01</TableIdText>
                      </TableD>
                      <TableD>
                        <TableInputText
                          className="input is-edit"
                          type="text"
                          name="xaxis"
                          value={item.xaxis}
                          // onChange={(e) => handleChange(e, index)}
                        />
                      </TableD>
                      <TableD>
                        <TableInputText
                          className="input is-edit"
                          type="text"
                          name="zaxis"
                          value={item.zaxis}
                          // onChange={(e) => handleChange(e, index)}
                        />
                      </TableD>
                      <TableD>
                        <TableInputText
                          className="input is-edit"
                          type="text"
                          name="fvalue"
                          value={item.fvalue}
                          // onChange={(e) => handleChange(e, index)}
                        />
                      </TableD>
                      <TableD>
                        <TableSelect
                          className="input is-edit"
                          type="text"
                          name="action"
                          value={item.action}
                          // onChange={(e) => handleChange(e, index)}
                        >
                          <option value="1">Ação 1</option>
                          <option value="2">Ação 2</option>
                          <option value="3">Ação 3</option>
                        </TableSelect>
                      </TableD>
                      <TableD>
                        <TableDivision>|</TableDivision>
                      </TableD>
                      <TableD>
                        <TableDContent>
                          <TableInputLabel>X</TableInputLabel>
                          <TableInputTextLabeled
                            className="input is-edit"
                            type="text"
                            name="fvalue"
                            value={item.fvalue}
                            // onChange={(e) => handleChange(e, index)}
                          />
                        </TableDContent>
                      </TableD>
                      <TableD>
                        <TableDContent>
                          <TableInputLabel>X</TableInputLabel>
                          <TableInputTextLabeled
                            className="input is-edit"
                            type="text"
                            name="fvalue"
                            value={item.fvalue}
                            // onChange={(e) => handleChange(e, index)}
                          />
                        </TableDContent>
                      </TableD>
                      <TableD>
                        <TableDContent>
                          <TableInputLabel>X</TableInputLabel>
                          <TableInputTextLabeled
                            className="input is-edit"
                            type="text"
                            name="fvalue"
                            value={item.fvalue}
                            // onChange={(e) => handleChange(e, index)}
                          />
                        </TableDContent>
                      </TableD>
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
