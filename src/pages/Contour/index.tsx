/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { editContour } from 'state/part/partSlice';

import Breadcrumbs from 'components/Breadcrumbs';
import GrindingTypeLabel from 'components/GrindingTypeLabel';
import Modal from 'components/Modal';
import CodePreview from 'components/CodePreview';

import { actionParams as actionParamsAux } from 'integration/functions-code';
import { XZ_REGEX } from 'utils/constants';

import { ContourItem, Part } from 'types/part';
import { StyledIcon } from 'components/SideMenu/styles';
import { colors } from 'styles/global.styles';

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
  ScrollBtn,
  RotatedIcon,
} from './style';
import { ActionParamsValidation } from './interface';

const defaultValue: ContourItem = {
  id: 0,
  name: '',
  type: 1,
  activities: [],
};

const Contour: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const initialState: ContourItem = useSelector((state: { part: Part }) => {
    const contour = state.part.contours.find((c) => c.id === Number(id));
    return contour || defaultValue;
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContourItem>({
    ...initialState,
  });
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const prevFormDataRef = useRef<ContourItem>(formData);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const [visibleFields, setVisibleFields] = useState(
    formData.activities.map(() => [0, 1, 2, 3]),
  );
  const [canNavigateNext, setCanNavigateNext] = useState<boolean[]>([]);
  const [canNavigatePrev, setCanNavigatePrev] = useState<boolean[]>([]);

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

  const updateNavigationAvailability = (
    index: number,
    newVisibleFields: number[][],
  ) => {
    setCanNavigateNext((prev) => {
      const newCanNavigateNext = [...prev];
      newCanNavigateNext[index] =
        newVisibleFields[index][3] <
        formData.activities[index].actionParams.length - 1;
      return newCanNavigateNext;
    });

    setCanNavigatePrev((prev) => {
      const newCanNavigatePrev = [...prev];
      newCanNavigatePrev[index] = newVisibleFields[index][0] > 0;
      return newCanNavigatePrev;
    });
  };

  const handleNext = (index: number) => {
    setVisibleFields((prev) => {
      const newVisibleFields = [...prev];
      if (
        newVisibleFields[index][3] >=
        formData.activities[index].actionParams.length - 1
      ) {
        return prev;
      }
      newVisibleFields[index] = [
        newVisibleFields[index][0] + 4,
        newVisibleFields[index][1] + 4,
        newVisibleFields[index][2] + 4,
        newVisibleFields[index][3] + 4,
      ];
      updateNavigationAvailability(index, newVisibleFields);
      return newVisibleFields;
    });
  };

  const handlePrev = (index: number) => {
    setVisibleFields((prev) => {
      const newVisibleFields = [...prev];
      if (newVisibleFields[index][0] === 0) {
        return prev;
      }
      newVisibleFields[index] = [
        newVisibleFields[index][0] - 4,
        newVisibleFields[index][1] - 4,
        newVisibleFields[index][2] - 4,
        newVisibleFields[index][3] - 4,
      ];
      updateNavigationAvailability(index, newVisibleFields);
      return newVisibleFields;
    });
  };

  useEffect(() => {
    setCanNavigateNext((prev) => {
      const newCanNavigateNext = formData.activities.map((activity, index) => {
        if (prev[index] !== undefined) {
          return prev[index];
        }
        return activity.actionParams.length > 3;
      });
      return newCanNavigateNext;
    });

    setCanNavigatePrev((prev) => {
      const newCanNavigatePrev = formData.activities.map((_, index) => {
        if (prev[index] !== undefined) {
          return prev[index];
        }
        return false;
      });
      return newCanNavigatePrev;
    });
  }, [formData.activities]);

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
            const newActionParams: ActionParamsValidation =
              defineActionParams(value);

            // Remove props to prevent user error
            const updatedItem = { ...item };
            Object.keys(updatedItem).forEach((key) => {
              if (key.startsWith('adtParam')) {
                // adtParam = short for additionalParam
                delete (updatedItem as any)[key];
              }
            });

            newActionParams.forEach((param) => {
              const paramName = `adtParam${param.id}`;
              (updatedItem as any)[paramName] = '';
            });

            setVisibleFields((prev) => {
              const newVisibleFields = [...prev];
              newVisibleFields[index] = [0, 1, 2, 3];
              return newVisibleFields;
            });

            setCanNavigateNext((prev) => {
              const newCanNavigateNext = [...prev];
              newCanNavigateNext[index] = newActionParams.length > 2;
              return newCanNavigateNext;
            });

            setCanNavigatePrev((prev) => {
              const newCanNavigatePrev = [...prev];
              newCanNavigatePrev[index] = false;
              return newCanNavigatePrev;
            });

            return {
              ...updatedItem,
              actionParams: newActionParams,
              [e.currentTarget.name]: value,
            };
          }
          return item;
        }),
      });
    } else if (
      index !== undefined &&
      e.currentTarget.name.startsWith('adtParam')
    ) {
      const actionCodeValue = formData.activities[index].actionCode;
      const params = actionParamsAux.find(
        (p) => p.actionCode === actionCodeValue,
      );
      const actionParamId = params?.actionParams.find((ap) => {
        const name = `adtParam${ap.id}`;
        return name === e.currentTarget.name;
      })?.id;
      const actionParamFieldName = `adtParam${actionParamId}`;
      const actionParamFieldValidation = params?.actionParams.find(
        (ap) => ap.id === actionParamId,
      )?.validation;

      if (
        (params &&
          e.currentTarget.name === actionParamFieldName &&
          actionParamFieldValidation &&
          value.match(RegExp(actionParamFieldValidation))) ||
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
    newActivities.splice(index + 1, 0, newActivity);
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

    setVisibleFields((prev) => {
      const newVisibleFields = [...prev];
      newVisibleFields.splice(index + 1, 0, [0, 1, 2, 3]);
      return newVisibleFields;
    });

    setCanNavigateNext((prev) => {
      const newCanNavigateNext = [...prev];
      newCanNavigateNext.splice(
        index + 1,
        0,
        newActivity.actionParams.length > 4,
      );
      return newCanNavigateNext;
    });

    setCanNavigatePrev((prev) => {
      const newCanNavigatePrev = [...prev];
      newCanNavigatePrev.splice(index + 1, 0, false);
      return newCanNavigatePrev;
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

      setVisibleFields((prev) => {
        const newVisibleFields = [...prev];
        newVisibleFields.splice(index, 1);
        return newVisibleFields;
      });

      setCanNavigateNext((prev) => {
        const newCanNavigateNext = [...prev];
        newCanNavigateNext.splice(index, 1);
        return newCanNavigateNext;
      });

      setCanNavigatePrev((prev) => {
        const newCanNavigatePrev = [...prev];
        newCanNavigatePrev.splice(index, 1);
        return newCanNavigatePrev;
      });
    }
  };

  const renderTableBlocks = (length: number) => {
    const blocks = [];
    const renderCount = 4 - length;
    for (let i = 0; i < renderCount; i += 1) {
      blocks.push(
        <TableD key={i}>
          <TableDContent>
            <TableInputLabel />
            <TableInputLabeled type="text" disabled />
          </TableDContent>
        </TableD>,
      );
    }
    return blocks;
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

  const renderField = (
    item: any, // ActivitiyItem com actionParams modificado para ActionParamsValidation
    fieldName: string,
    fieldId: string,
    index: number,
  ) => {
    if (fieldId && fieldId !== '') {
      return (
        <TableD key={fieldName}>
          <TableDContent>
            <TableInputLabel>{fieldId}</TableInputLabel>
            <TableInputLabeled
              className="input is-edit"
              type="text"
              name={fieldName}
              value={item[fieldName]}
              onChange={(e) => handleChange(e, index)}
            />
          </TableDContent>
        </TableD>
      );
    }
    return null;
  };

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
                          <HText>Código</HText>
                        </TableH>
                        {/* <TableH>
                          <HText>X</HText>
                        </TableH>
                        <TableH>
                          <HText>Z</HText>
                        </TableH>
                        <TableH>
                          <HText>F</HText>
                        </TableH> */}
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
                              name="actionCode"
                              value={item.actionCode}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </TableD>
                          {/* <TableD>
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
                          </TableD> */}
                          <TableD>
                            <TableDivision>|</TableDivision>
                          </TableD>
                          <TableD>
                            <ScrollBtn
                              type="button"
                              onClick={() => handlePrev(index)}
                              color={
                                canNavigatePrev[index]
                                  ? colors.blue
                                  : colors.greyMedium
                              }
                            >
                              <RotatedIcon
                                className="icon-expand_less"
                                color={colors.white}
                                fontSize="22px"
                              />
                            </ScrollBtn>
                          </TableD>
                          {item.actionParams.map((param, paramIndex) => {
                            if (visibleFields[index].includes(paramIndex)) {
                              return renderField(
                                item,
                                `adtParam${param.id}`,
                                param.id,
                                index,
                              );
                            }
                            return null;
                          })}
                          {renderTableBlocks(item.actionParams.length)}
                          <TableD>
                            <ScrollBtn
                              type="button"
                              onClick={() => handleNext(index)}
                              color={
                                canNavigateNext[index]
                                  ? colors.blue
                                  : colors.greyMedium
                              }
                            >
                              <RotatedIcon
                                className="icon-expand_more"
                                color={colors.white}
                                fontSize="22px"
                              />
                            </ScrollBtn>
                          </TableD>
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
