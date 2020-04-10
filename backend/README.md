# Rota Flex 101 back end

## Basic usage

To build the back end run (from the backend directory)
```
./gradlew build
```

Then run the server with
```
./gradlew bootRun
```

## Server endpoints

To list all available endpoints, run the server and go to `{server-root}/swagger-ui.html`.
For example, when running locally, visit:
```
http://localhost:8080/swagger-ui.html
```

## Linters

PMD, Spotbugs and Checkstyle are used. 
The configuration files can be found in their respective directories
in backend/config

### Checkstyle

Currently using Google's checkstyle.xml, which uses the following:

- Static imports before other imports
- Imports in alphabetical order
- No .* in imports - each import must be included individually
- 2 spaces for indentation
- Lines no longer than 100 characters
- Requires javadoc comments:
     - First sentence must end with a full stop
     - No empty @ clauses
- class and variable names shouldn't have 2 capital letters in a row (except static final
 variables must be UPPER_SNAKE_CASE)
- modifier keywords ordered according to JLS recommendations: `public protected private abstract default static final transient volatile synchronized native strictfp`
- each variable declared in separate statements, e.g. `int a; int b;` instead of `int a, b`;

The config files can be found in config/checkstyle directory.

### PMD

See `config/pmd/ruleset.xml` for a list of disabled rules with comments.

### Spotbugs

Compiles via gradle tasks, may cause problems when running the gradle wrapper from terminal if java version is <11. 
Make sure that `java -version` returns 11 or higher and if not update the PATH environment variable to include the path to java 11+ binary. `which java` gives a list of paths containing java binaries and may be helpful here.

For a list of disabled rules with reasons see `config/spotbugs/exclusions.xml`

