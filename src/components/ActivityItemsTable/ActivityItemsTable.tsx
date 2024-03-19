import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'state/store';
import { XZ_REGEX } from 'constants/constants';
import { ActivityPropsItems } from 'state/activityTestSlice/interface';
import { editActivityItems } from 'state/activityTestSlice/slice';

import { writeConfigRequest } from 'secure-electron-store';

import './style.css';

const ActivityItemsTable: React.FC = () => {
  const activityState = useSelector(
    (state: RootState) => state.activityTestReducer,
  );
  const [formData, setFormData] = useState<ActivityPropsItems>({
    ...activityState,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData({
      ...activityState,
    });
    window.electron.store.send(
      writeConfigRequest,
      'activityTableSave',
      activityState.activityItems,
    );
  }, [activityState]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.currentTarget.value;
    console.log(index, e.currentTarget.name, value);
    console.log('formData', formData);
    if (value.match(XZ_REGEX) || value === '') {
      setFormData({
        ...formData,
        activityItems: formData.activityItems.map((item, i) => {
          if (i === index) {
            return { ...item, [e.currentTarget.name]: value };
          }
          return item;
        }),
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editActivityItems(formData.activityItems));
  };

  const handleRemove = (index: number) => {
    dispatch(
      editActivityItems(
        formData.activityItems.filter((item, i) => i !== index),
      ),
    );
  };

  return (
    <div>
      <h2 className="title is-3 center">Ordenação</h2>
      <div>
        <form
          name="activity-items-table"
          className="activity-items-table"
          onSubmit={handleSubmit}
        >
          <table className="table table-ordenation">
            <thead className="table-ordenation head">
              <tr>
                <th>X</th>
                <th>Z</th>
                <th>T</th>
                <th>F</th>
                <th>Ação</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="table-ordenation body">
              {formData.activityItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      className="input is-edit"
                      type="text"
                      name="xaxis"
                      value={item.xaxis}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="input is-edit"
                      type="text"
                      name="zaxis"
                      value={item.zaxis}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="input is-edit"
                      type="text"
                      name="tvalue"
                      value={item.tvalue}
                      onChange={(e) => handleChange(e, index)}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      className="input is-edit"
                      type="text"
                      name="fvalue"
                      value={item.fvalue}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="input is-edit"
                      type="text"
                      name="action"
                      value={item.action}
                      onChange={(e) => handleChange(e, index)}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="submit"
                      className="button is-success"
                      value="Editar"
                    />
                  </td>
                  <td>
                    <input
                      type="button"
                      className="button is-danger"
                      value="Remover"
                      onClick={() => handleRemove(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default ActivityItemsTable;
