/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { editOperation } from 'state/operations/operationsSlice';

import Breadcrumbs from 'components/Breadcrumbs';
import { XZ_REGEX } from 'constants/constants';
import { Operations } from 'types/part';
import { actionParams as actionParamsAux } from 'integration/functions-code';
import defineActionParams from './defineActionParams';

import {
  Container,
  Content,
  TitleContainer,
  Title,
  TitleEdit,
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
  TableInputTextLabeled,
  TableInputLabel,
  TableDivision,
  AddBtn,
  DeleteBtn,
  TableDContent,
  TitleEditBtn,
  TitleEditIconEdit,
  TitleEditIconDone,
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
    (state: { operations: Operations }) => state.operations[0],
  );
  const [formData, setFormData] = useState({
    ...initialState,
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const prevFormDataRef = useRef(formData);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number,
  ) => {
    const { value } = e.currentTarget;
    if (e.currentTarget.name === 'name') {
      setFormData({
        ...formData,
        [e.currentTarget.name]: value,
      });
    } else if (
      e.currentTarget.name === 'actionCode' ||
      (e.currentTarget.name === 'actionCode' && value === '')
    ) {
      setFormData({
        ...formData,
        activities: formData.activities.map((item, i) => {
          if (i === index) {
            const actionParams = defineActionParams(value);
            const {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              aParamValidation,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              bParamValidation,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              cParamValidation,
              ...rest
            } = actionParams;
            return {
              ...item,
              [e.currentTarget.name]: value,
              ...rest,
            };
          }
          return item;
        }),
      });
    } else if (
      index !== undefined &&
      (e.currentTarget.name === 'aParamValue' ||
        e.currentTarget.name === 'bParamValue' ||
        e.currentTarget.name === 'cParamValue')
    ) {
      const actionCodeValue = formData.activities[index].actionCode;
      const params = actionParamsAux.find(
        (p) => p.actionCode === actionCodeValue,
      );
      if (
        (params &&
          ((e.currentTarget.name === 'aParamValue' &&
            params.aParamValidation &&
            value.match(params.aParamValidation)) ||
            (e.currentTarget.name === 'bParamValue' &&
              params.bParamValidation &&
              value.match(params.bParamValidation)) ||
            (e.currentTarget.name === 'cParamValue' &&
              params.cParamValidation &&
              value.match(params.cParamValidation)))) ||
        value === ''
      ) {
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
    } else if (value.match(XZ_REGEX) || value === '') {
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

  const toggleEdit = () => {
    setIsEditingName(!isEditingName);
  };

  useEffect(() => {
    if (JSON.stringify(formData) !== JSON.stringify(prevFormDataRef.current))
      dispatch(editOperation({ id: formData.id, changes: formData }));
    prevFormDataRef.current = formData;
  }, [dispatch, formData]);

  useEffect(() => {
    setFormData({ ...initialState });
  }, [dispatch, initialState]);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingName]);

  return (
    <Container>
      <Breadcrumbs items={breadcrumbsItems} />
      <Content>
        <form
          name="activity-items-table"
          className="activity-items-table"
          // onSubmit={handleSubmit}
        >
          <TitleContainer>
            {isEditingName ? (
              <TitleEdit
                ref={nameInputRef}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ width: `${formData.name.length}ch` }}
              />
            ) : (
              <Title>{formData.name}</Title>
            )}
            <TitleEditBtn type="button" onClick={toggleEdit}>
              {isEditingName ? (
                <TitleEditIconEdit className="icon-check_circle" />
              ) : (
                <TitleEditIconDone className="icon-create" />
              )}
            </TitleEditBtn>
          </TitleContainer>
          <Block>
            <TableWrapper>
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
                      <HText>Código</HText>
                    </TableH>
                    <TableH />
                    <TableH colSpan={3}>
                      <HText>Parâmetros Adicionais</HText>
                    </TableH>
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
                      <TableD>
                        <TableInputText
                          className="input is-edit"
                          type="text"
                          name="actionCode"
                          value={item.actionCode}
                          onChange={(e) => handleChange(e, index)}
                        />
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
                        <TableD>
                          <TableDContent>
                            <TableInputLabel />
                            <TableInputTextLabeled type="text" disabled />
                          </TableDContent>
                        </TableD>
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
                        <TableD>
                          <TableDContent>
                            <TableInputLabel />
                            <TableInputTextLabeled type="text" disabled />
                          </TableDContent>
                        </TableD>
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
                        <TableD>
                          <TableDContent>
                            <TableInputLabel />
                            <TableInputTextLabeled type="text" disabled />
                          </TableDContent>
                        </TableD>
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
            </TableWrapper>
          </Block>
        </form>
      </Content>
    </Container>
  );
};

export default Operation;
