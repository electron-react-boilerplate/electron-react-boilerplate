// Provavelmente essa função vai virar um componente que pegara os dados do select do menu config para abastecer o select e os seus respectivos parametros
function defineActionParams(actionValue: string) {
  if (actionValue === 'action1')
    return {
      aParamId: 'x',
      aParamValue: '',
      bParamId: 'b',
      bParamValue: '',
      cParamId: 'c',
      cParamValue: '',
    };
  if (actionValue === 'action2')
    return {
      aParamId: 'a',
      aParamValue: '',
      bParamId: 'b',
      bParamValue: '',
      cParamId: '',
      cParamValue: null,
    };
  if (actionValue === 'action3')
    return {
      aParamId: 'a',
      aParamValue: '',
      bParamId: '',
      bParamValue: null,
      cParamId: '',
      cParamValue: null,
    };
  return {
    aParamId: '',
    aParamValue: null,
    bParamId: '',
    bParamValue: null,
    cParamId: '',
    cParamValue: null,
  };
}

export default defineActionParams;
