import React, { createContext, useReducer, Dispatch } from 'react';

import {
  CalcularHoraReducerAction,
  CalcularHoraReducerStateType,
  calcularHoraReducer,
  initialState as initialStateCalcularHoraReducer,
} from '@App/reducer/CalcularHoraReducer';

type InitialStateType = {
  calcularHora: CalcularHoraReducerStateType;
};
const initialState: InitialStateType = {
  calcularHora: initialStateCalcularHoraReducer,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<CalcularHoraReducerAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { calcularHora }: InitialStateType,
  action: CalcularHoraReducerAction
) => ({
  calcularHora: calcularHoraReducer(calcularHora, action),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
