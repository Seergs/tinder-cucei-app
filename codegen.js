module.exports = {
  schema: "http://localhost:5000/graphql",
  overwrite: true,
  documents: ["./api/**/*.graphql"],
  generates: {
    "./api/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactHooksImportFrom: "@apollo/client",
      },
    },
  },
};
