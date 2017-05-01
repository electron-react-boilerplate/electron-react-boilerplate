module.exports = function (plop) {
  // create your generators here
  plop.setGenerator('helper', {
    description: 'Create a utils file',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is the name of your file?',
      validate: function (value) {
        if ((/.+/).test(value)) { return true; }
        return 'name is required';
      }
    }],
    actions: [{
      type: 'add',
      path: './app/utils/{{camelCase name}}.js',
      templateFile: 'templates/helper.js',
      abortOnFail: true
    }]
  }),

  plop.setGenerator('component', {
    description: 'Generate a new component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'What is the name of your component?',
      validate: function (value) {
        if ((/.+/).test(value)) { return true; }
        return 'name is required';
      }
    }, {
        type: 'confirm',
        name: 'stateless',
        message: 'Is this a stateless component?'
    }, {
        type: 'confirm',
        name: 'styled',
        message: 'Is this component styled?'
    }],

    actions: function(data) {
      var actions = [];

      if(data.styled) {
        actions = actions.concat([
          {
            type: 'add',
            path: './app/components/{{properCase name}}.css',
            templateFile: 'templates/style.css',
            abortOnFail: true
          }
        ]);
      }

      if(data.stateless) {
        actions = actions.concat([
          {
            type: 'add',
            path: './app/components/{{properCase name}}.js',
            templateFile: 'templates/stateless.js',
            abortOnFail: true
          }
        ]);
      } else {
        actions = actions.concat([
          {
            type: 'add',
            path: './app/components/{{properCase name}}.js',
            templateFile: 'templates/stateful.js',
            abortOnFail: true
          }, {
            type: 'add',
            path: './app/actions/{{camelCase name}}.js',
            templateFile: 'templates/actions.js',
            abortOnFail: true
          }, {
            type: 'add',
            path: './app/containers/{{properCase name}}Page.js',
            templateFile: 'templates/container.js',
            abortOnFail: true
          }, {
            type: 'add',
            path: './app/reducers/{{camelCase name}}.js',
            templateFile: 'templates/reducer.js',
            abortOnFail: true
          },
          {
            type: 'modify',
            path: './app/reducers/index.js',
            pattern: /(const rootReducer\s=\scombineReducers\(\{)/gi,
            template: '$1\n  {{camelCase name}},'
          },
          {
            type: 'modify',
            path: './app/reducers/index.js',
            pattern: /(import \{ routerReducer as routing } from 'react-router-redux';)/gi,
            template: '$1\nimport {{camelCase name}} from \'./{{camelCase name}}\';'
          }
        ]);
      }
      return actions;
    }

  });
};

