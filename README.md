# RotaFlex 101

A timetable management tool designed to be easy to use by both the manager and users. Managers will have access to a summary page which shows details on who is working, and how wages are currently distributed. Users will have easy access to see when they are required to work.

## Getting Started

These instructions will get you a copy of the project running on your local machine.

### Front-end

Uses React, and requires `node` and `npm` to run the development server.

Navigate to the `frontend` directory and install dependencies using
```
npm i
```
After installing the required packages, start the development server using
```
npm start
```

### Back-end

Uses Java Spring, and requires `JDK 11`.

Navigate to the `backend` directory and build using
```
./gradlew build
```
- After the build is complete, run the back-end
```
./gradlew bootRun
```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and general code styling.

## License

This project is licensed under the MIT license - see the [LICENSE](./LICENSE) file for details.

## Linting

Optionally, one can set up the git pre-commit hook to run the linters locally before every commit
for maximum annoyance. The hook will only run if any *.java file has been modfied.

To do so go to the project root directory (one up from the location of this README) and symlink
 .githooks/pre-commit to .git/hooks/pre-commit.
 Make sure that the file is executable.
 
  This can be done with the following commands:
```
ln -s ../../.githooks/pre-commit .git/hooks
chmod +x .git/hooks/pre-commit
```

Alternatively, git could be set up to recognise the `.githooks` directory using:
```
git config --local core.hooksPath .githooks/
```