/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { editContour } from 'state/part/partSlice';

import Breadcrumbs from 'components/Breadcrumbs';
import GrindingTypeLabel from 'components/GrindingTypeLabel';
import Modal from 'components/Modal';
import CodePreview from 'components/CodePreview';

import { StyledIcon } from 'components/SideMenu/styles';

import { XZ_REGEX } from 'utils/constants';
import { ContourItem, Part } from 'types/part';
import { colors } from 'styles/global.styles';
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
  TableInput,
  TableInputLabeled,
  TableInputLabel,
  TableDivision,
  AddBtn,
  DeleteBtn,
  TableDContent,
  TitleEditBtn,
  TitleEditIconEdit,
  TitleEditIconDone,
  CodePreviewBtn,
  PageHead,
  BtnText,
} from './style';

const defaultValue: ContourItem = {
  id: 0,
  name: '',
  type: 'Internal',
  activities: [],
};

const Contour: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const initialState: ContourItem = useSelector((state: { part: Part }) => {
    const contour = state.part.contours.find((c) => c.id === Number(id));
    console.log('contour encontrado:', contour);
    return contour || defaultValue;
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContourItem>({
    ...initialState,
  });
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const prevFormDataRef = useRef<ContourItem>(formData);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const breadcrumbsItems = [
    {
      label: 'Grupo de Trabalho',
      url: '/workgroup',
      isActive: false,
    },
    {
      label: `${formData.name}`,
      url: `/contour/${formData.id}`,
      isActive: true,
    },
  ];

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
      dispatch(editContour({ id: formData.id, changes: formData }));
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
      <Modal
        title={`Code Preview de ${formData.name}`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <CodePreview contourId={formData.id} />
      </Modal>
      {formData.activities ? (
        <>
          <Breadcrumbs items={breadcrumbsItems} />
          <Content>
            <form name="activity-items-table" className="activity-items-table">
              <PageHead>
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
                <TitleContainer>
                  <GrindingTypeLabel
                    contourType={formData.type}
                    fontSize="14px"
                  />
                  <CodePreviewBtn>
                    <StyledIcon
                      className="icon-code"
                      color={colors.white}
                      fontSize="28px"
                    />
                    <BtnText
                      onClick={(
                        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                      ) => {
                        e.preventDefault();
                        setIsModalOpen(true);
                      }}
                    >
                      Code Preview
                    </BtnText>
                  </CodePreviewBtn>
                </TitleContainer>
              </PageHead>
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
                            <TableInput
                              className="input is-edit"
                              type="text"
                              name="xaxis"
                              value={item.xaxis}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </TableD>
                          <TableD>
                            <TableInput
                              className="input is-edit"
                              type="text"
                              name="zaxis"
                              value={item.zaxis}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </TableD>
                          <TableD>
                            <TableInput
                              className="input is-edit"
                              type="text"
                              name="fvalue"
                              value={item.fvalue}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </TableD>
                          <TableD>
                            <TableInput
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
                                <TableInputLabel>
                                  {item.aParamId}
                                </TableInputLabel>
                                <TableInputLabeled
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
                                <TableInputLabeled type="text" disabled />
                              </TableDContent>
                            </TableD>
                          )}
                          {item.bParamValue || item.bParamValue === '' ? (
                            <TableD>
                              <TableDContent>
                                <TableInputLabel>
                                  {item.bParamId}
                                </TableInputLabel>
                                <TableInputLabeled
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
                                <TableInputLabeled type="text" disabled />
                              </TableDContent>
                            </TableD>
                          )}
                          {item.cParamValue || item.cParamValue === '' ? (
                            <TableD>
                              <TableDContent>
                                <TableInputLabel>
                                  {item.cParamId}
                                </TableInputLabel>
                                <TableInputLabeled
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
                                <TableInputLabeled type="text" disabled />
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
        </>
      ) : (
        'Página não encontrada'
      )}
    </Container>
  );
};

export default Contour;
