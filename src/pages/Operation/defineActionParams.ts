function defineActionParams(actionValue: string) {
  switch (actionValue) {
    case 'action1':
      return {
        aParamId: 'x',
        aParamValue: '',
        bParamId: 'b',
        bParamValue: '',
        cParamId: 'c',
        cParamValue: '',
      };
    case 'action2':
      return {
        aParamId: 'a',
        aParamValue: '',
        bParamId: 'b',
        bParamValue: '',
        cParamId: null,
        cParamValue: null,
      };
    case 'action3':
      return {
        aParamId: 'a',
        aParamValue: '',
        bParamId: null,
        bParamValue: null,
        cParamId: null,
        cParamValue: null,
      };
    case '':
      return {
        aParamId: null,
        aParamValue: null,
        bParamId: null,
        bParamValue: null,
        cParamId: null,
        cParamValue: null,
      };
    default:
      return {
        aParamId: null,
        aParamValue: null,
        bParamId: null,
        bParamValue: null,
        cParamId: null,
        cParamValue: null,
      };
  }
}

export default defineActionParams;
