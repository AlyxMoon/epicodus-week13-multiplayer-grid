module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "comma-dangle": ['error', 'always-multiline'],
    "keyword-spacing": "off",
    "@typescript-eslint/keyword-spacing": "off"
  }
}
