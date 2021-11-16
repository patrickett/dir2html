# cra-template-tailwind-ts

This is a **starter template for a React.js project**, configured with **Create-React-App**, **Tailwind** and **Typescript**.

### Setup 📦

```
npx create-react-app <YOUR_APP_NAME> --template tailwind-ts
```

### Configuring tailwind ⚙️

The `tailwind.css` file *(at project root)* is used as source css for Tailwind. Use that to make changes to the generated-on-fly `index.css` *(in src/styles/)*. This generated file is used in the project.

Also, `tailwind-config-full.js` exists as a reference should you need to modify `tailwind.config.js`.

### Development 👨‍💻

Starts `tailwindcss` in jit mode and the local React dev server.
```
yarn dev
```

### Building 🚀

- **Build project**:
    ```
    yarn build
    ```
- **Build only CSS**:
    ```
    yarn build:css
    ```
