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
- Husky

## Code Style

Code style and eslint config is adapted from the airbnb-typescript template. We may want to change this if rules seem too restrictive.

Code style is enforced with husky, using pre-commit checks with prettier and eslint. If either detect changes that they cannot fix, a commit will not go through and errors will be displayed on the console.

### Using with VScode

An addiitonal `.vscode` config directory is located in the root directory. This file contains settings to point the eslint and prettier VScode plugins to the `frontend` directory when opening the project from the root directory. If this is not done, the settings for either file will not be found causing linting warning and auto-formatting not to occur correctly.
