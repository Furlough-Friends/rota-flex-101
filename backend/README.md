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

#### Protected endpoints

All protected endpoints require an authentication header in this form:

`Authorization: Bearer <token>`

To access protected endpoints from Swagger UI, you will need to add your JWT token to Swagger in the form:
 
 `Bearer: <your token here>` 
 
You can get your access token by using the `<TokenButton />` component in the front-end to print your access 
token to the console.

As well as having an access token, you need to ensure that the database includes a row with your email address,
as well as the desired permission role. To do this, add another row to `data.sql` which can be found in 
`/src/main/resources/`.

### myShifts endpoint

Returns shifts of a given user (inferred from the authentication token).
At the moment authentication has not been implemented yet, so the "token" is just user ID.
Example call:
` curl 'http://localhost:8080/myShifts?start=1410-07-15T00:00:00Z&end=2100-01-01T00:00:00Z' -H
 'Authorization: 1' ` 

The start and end dates are optional, so this is valid as well:
` curl 'http://localhost:8080/myShifts' -H 'Authorization: 1' ` 
where 1 is the user ID and can be replaced with some other value.

### Create a Staff member endpoint

`/staff/create`

Any Staff with a `MANAGER` role can create a user using the `/staff/create` POST endpoint. This 
expects the details of the `Staff` within the body of the request and will create and add a new 
`Staff` record to the database. On a good request, the response will be an `OK` with the 
details of the new staff record created in the response body.

Users trying to use the endpoint with other roles will fail with an `unauthorized` response.

This endpoint expects an `Authorization` header, if not found this will fail with a `bad request` 
response.

An example request can be seen through the [swagger endpoint](#server-endpoints).

A minimal request can look as follows:

`curl "http://localhost:8080/staff/create" -H 'Authorization: xx' -X 'POST' -H 'Content-Type:application/json' -d '{"firstName":"a", "surname":"b", "role":"MANAGER"}'`

## Database

Spring currently sets up an in-memory H2 database with dummy entries.
To access it while Spring is running go to
```
http://localhost:8080/h2-console
```
and enter credentials as found in `src/main/resources/application.properties` file.

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

## Using with IntelliJ

In order to use the project with IntelliJ and have it recognise the file as a gradle project, allowing compatibility 
with the IntelliJ gradle plugin there are 2 options:

- Open the `backend` directory as a project by using `File > New > Project from Existing Sources... ` then navigating 
to the `backend` folder, selecting the `build.gradle` file and clicking `OK`

- Alternatively if opening the root directory is desired (in order to have all files available from within IntelliJ) 
follow these steps:
    1. Open the root directory
    1. Navigate to `File > Project Structure` or use the keyboard shortcut (default: `Ctrl` + `Alt` + `Shift` + `S`)
    1. In the right panel, under `Project Settings` select `Modules`
    1. Press the `+` at the top of the middle panel
    1. Select `Import Module`
    1. Navigate to the `backend` directory, select the `build.gradle` file and press `OK`
    
In both these cases IntelliJ will take a few moments to configure itself to recognise the project and set up the gradle 
plugin to work with it.

**Note** -  In order for IntelliJ to cooperate with Lombok, the `Lombok` IntelliJ plugin must be installed. Otherwise
warnings will appear on code within IntelliJ (but it will still compile and run correctly).
