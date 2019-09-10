# REST Hapi API Template

A template for a rest web API built with hapijs.

### Requirements
* node: 10.12.0
* npm: 6.4.1

***

### Running

Execute the follonwing commands to run the project:

```shell
npm install
npm start
```

Execute the following command to run the tests:

```shell
npm test
```

npm teste will check development patterns based on javascript standard pattern and then will execute the unit tests.

### Available environment variables:

* **NODE_ENV**= environment(can be, production, develoment, test) to run the project, it will be necessary a file with variable values matching the pattern .env-[NODE_ENV] or previously exported variables values.
* **PORT**= API por that api will use to run.
* **API_BASE_PATH**= base path of api( a common path to identify the resource, like: `/v1`).
* **API_NEWRELIC_ENABLED**= toogle new relic on/off
* **API_NEWRELIC_LICENSE_KEY**= newrelic license key.
* **API_AUTH_REQUIRE_AUTHORIZATION**= toggle api auth on/off.
* **API_LOG_ENABLED**= toggle custom logs on/off.
* **API_AUTH_CERTIFICATE**= ssh auth token to certificate jwt signature.
* **API_DB_MONGO_USER**= db user name.
* **API_DB_MONGO_PASSWORD**= db password.
* **API_DB_MONGO_HOST**= db name.

***

### Documentation

* There is a swagger documentation available through `localhost:9000/{basepath}/documentation`( ex: [localhost:9000/v1/documentation]()) route.
* The is a JsDoc files that specify bapck-end methods. To update the source files run `npm run jsdoc`, and if you want to view the source docs run `npm run jsdoc-view` command.

***

### Making requests

Use this token in `Authorization` request header parameter when you call this api.

**API access token**: `API_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6InRlbHppci1hcGkiLCJpYXQiOjE1NTA2MjM0OTJ9.X9VAB3T4TldYP_q9rxm_jQhYqxE69E-LEJyWqcVXuJQ"`

***

### Structure

This is the base structure, built to support large and small applications, complexes and simple ones, even if your pass through an agressive growth.

All initial project folders:
```
 root:
    > libs
        > api
            > config
            > databases
            > helpers
            > middlewares
            > routes
        > core
            > business modules
                > adapters
    > out
```
Describing

1. **root**: This is the base project directory. It may have, **`libs`** folder and `package.json`, `jenkins`, `lint` and `.env` files.
  
    1.1. **libs**: This directory holds all the API files(configurations and business files, until now).
        1.1.1. **api**: API configuration directory, here you will create yours API helpers, databases connections, API middlewares, API routes registers... All code with API context(try not mix business scripts here, they have its places in `core/business-module`)
    
    1.2 **core**: This directory holds all the business files, for exemple, if I have a selling system, here I will have: a `customers`, `suppliers`, `supplies` and `products` folders. Each one with its files, `controller`, `model`, `repository`, `routes`, `service`, `spec`(for unit test), `adapters` and all other script file that you will need. Always trying to respect the business conext and the self-sufficient module.
    Exemple:
    ```
        > core:
            > customers
                > customers.controller.js
                > customers.model.js
                > customers.repository.js
                > customers.routes.js
                > customers.service.js
                > customers.spec.js
                > adapters
                    > customer.adapter.js
                    > customerFromExternalRequest.adapter.js
    ```  
***

Pendding Items:
 - yeoman generator