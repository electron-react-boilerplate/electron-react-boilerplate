/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { editOperation } from 'state/operations/operationsSlice';
import Breadcrumbs from 'components/Breadcrumbs';
import { XZ_REGEX } from 'constants/constants';
import { Operations } from 'types/part';
import defineActionParams from './defineActionParams';
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

const Operation: React.FC = () => {
  const dispatch = useDispatch();
  const initialState = useSelector(
    (state: { operations: Operations[] }) => state.operations[0],
  );
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
    } else if (e.currentTarget.name === 'actionValue') {
      setFormData({
        ...formData,
        activities: formData.activities.map((item, i) => {
          if (i === index) {
            const actionParams = defineActionParams(value);
            return {
              ...item,
              [e.currentTarget.name]: value,
              ...actionParams,
            };
          }
          return item;
        }),
      });
    }
  };

  const handleAdd = (index: number) => {
    let newActivities = [...formData.activities];
    const newActivity = {
      ...formData.activities[index],
      id: index + 2,
    };
    // função splice adiciona o novo item na posição index + 1
    newActivities.splice(index + 1, 0, newActivity);
    // função map atualiza os ids dos itens seguintes
    newActivities = newActivities.map((activity, i) => {
      if (i >= index + 2) {
        return { ...activity, id: activity.id + 1 };
      }
      return activity;
    });
    setFormData({
      ...formData,
      activities: newActivities,
    });
  };

  const handleDelete = (index: number) => () => {
    if (formData.activities.length > 1) {
      let newActivities = [...formData.activities];
      newActivities.splice(index, 1);
      newActivities = newActivities.map((activity, i) => {
        return { ...activity, id: i + 1 };
      });
      setFormData({
        ...formData,
        activities: newActivities,
      });
    }
  };

  useEffect(() => {
    dispatch(editOperation({ id: formData.id, changes: formData }));
  }, [dispatch, formData]);

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
                    <tr key={item.id}>
                      <TableD>
                        <AddBtn
                          type="button"
                          className="icon-add"
                          onClick={() => handleAdd(index)}
                        />
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
                      {/* TODO De acordo com os valores selecionados de ações, a geração dos campos e seus IDs pra aquela linha */}
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
                        <DeleteBtn
                          type="button"
                          className="icon-delete"
                          onClick={handleDelete(index)}
                        />
                      </TableD>
                    </tr>
                  ))}
                </TableBody>
              </Table>
              <button type="submit">Salvar</button>
            </form>
          </TableWrapper>
        </Block>
      </Content>
    </Container>
  );
};

export default Operation;
