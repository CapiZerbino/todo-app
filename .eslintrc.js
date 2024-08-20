module.exports = {
  root: true,
  "extends": [
    "@react-native-community",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    'plugin:react-native/all',
    "prettier",
  ],
  "ignorePatterns": [
    ".eslintrc.js",
    "node_modules/",
    "lib/",
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'perfectionist'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            arrowParens: "avoid",
            quoteProps: 'consistent',
            singleQuote: true,
            tabWidth: 2,
            trailingComma: 'all',
            printWidth: 200,
            useTabs: false,
            semi: true,
            bracketSameLine: false,
            bracketSpacing: true,
            
          },
        ],
        "perfectionist/sort-objects": [
          "error",
          {
            "type": "alphabetical",
            "order": "asc"
          }
        ],
        "perfectionist/sort-imports": [
          "error",
          {
            "type": "alphabetical",
            "order": "asc",
            "groups": [
              "type",
              "react",
              "nanostores",
              ["builtin", "external"],
              "internal-type",
              "internal",
              ["parent-type", "sibling-type", "index-type"],
              ["parent", "sibling", "index"],
              "side-effect",
              "style",
              "object",
              "unknown"
            ],
          }
        ],
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-use-before-define': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/indent': 0,
        '@typescript-eslint/member-delimiter-style': 0,
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-object-literal-type-assertion': 0,
        'no-return-assign': 0,
        '@typescript-eslint/ban-ts-comment': 0, // Sometimes this is neccessary
        'react/display-name': 0,
        'react/prop-types': 0,
        'react-native/no-unused-styles': 0,
        'react-native/sort-styles': 0,
      },
    },
  ],
};
