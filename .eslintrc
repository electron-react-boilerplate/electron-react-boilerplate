{
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": true
  },
  "extends": [
    "airbnb",
    "prettier"
  ],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "arrow-parens": ["off"],
    "compat/compat": "error",
    "consistent-return": "off",
    "comma-dangle": "off",
    "generator-star-spacing": "off",
    "import/no-unresolved": "error",
    "import/no-extraneous-dependencies": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-console": "off",
    "no-use-before-define": "off",
    "no-multi-assign": "off",
    "promise/param-names": "error",
    "promise/always-return": "error",
    "promise/catch-or-return": "error",
    "promise/no-native": "off",
    "react/sort-comp": ["error", {
      "order": ["type-annotations", "static-methods", "lifecycle", "everything-else", "render"]
    }],
    "react/jsx-no-bind": "off",
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
    "react/prefer-stateless-function": "off"
  },
  "plugins": [
    "flowtype",
    "import",
    "promise",
    "compat",
    "react"
  ],
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "webpack.config.eslint.js"
      }
    }
  }
}
