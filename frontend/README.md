# ToraFlex 101 - Front end

## File Structure

We are using the ["ducks" file structure](https://github.com/erikras/ducks-modular-redux), which works well with redux-toolkit slices ([A slice ≈ a duck](https://redux-toolkit.js.org/usage/usage-guide#creating-slices-of-state)).

## Major Packages

- Typescript
- React
- Redux
  - Redux Toolkit ([Why use toolkit?](https://redux-toolkit.js.org/introduction/quick-start))
    - Redux Thunk
    - Redux Devtools
  - Redux Logger

## Code Style

Code style and eslint config is adapted from the airbnb-typescript template. We may want to change this if rules seem too restrictive.

Run the following command to perform linting on all .js, .jsx, .ts and .tsx files in the src directory:
```
npm run lint
```

### Using with VScode

An addiitonal `.vscode` config directory is located in the root directory. This file contains settings (in a `settings.json` file) to point the eslint and prettier VScode plugins to the `frontend` directory when opening the project from the root directory. If this is not done, the settings for either file will not be found causing linting warning and auto-formatting not to occur correctly.

The `.vscode/settings.json` should have contents similar to:
```
{
	"eslint": {
      "workingDirectories": [
        "frontend"
    ]
  },
  "prettier": {
    "configPath": "frontend/.prettierrc",
  }
}
```

## Access Token

If you want to grab an access token for testing purposes, you can add a `<TokenButton />` component somewhere on a page, for example in the sidebar. This button will print your current access token to the console.