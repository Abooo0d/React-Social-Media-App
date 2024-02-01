# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## In This Project I Am Using App Write As Database Management System The Main Rules To Set It Up

- Install The Package 'appwrite' =>
  `npm install appwrite`
- Get The Api Key And The Main Elements Key To Create Instance Of Them
- Creating The Instance Of The Main Element To Connect To The appwrite Database
  [Client ,Account ,Database, Storage,Avatars] In AppWrite/config.ts
- Creating THe Main Function To Get The Data From The Database in Appwrite/api.ts

## Using Shad-cn For The Components

- Install The Package 'shad-cn' => `npx shadcn-ui@latest init`
- Then Follow The Shad-cn Docs To Complete The Setup

## Using Zod For Form Validation

- Install The Package 'zod' => `npm install zod`
  Then Creating A Validator in src/lib/Validation/index.ts
- Using The Validator In The Form

## Using React-Query
