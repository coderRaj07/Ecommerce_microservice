------------User Service-----------

npm i -g serverless

sls
(select http-api)

npm init

sls plugin install --name serverless-offline

sls plugin install --name serverless-plugin-typescript

tsc --init

npm i aws-lambda --dev typescript ts-node @types/aws-lambda

yarn run dev

yarn add @middy/core

yarn add @middy/http-json-body-parser

yarn add class-transformer class-validator tsyringe reflect-metadata

yarn add bcrypt && yarn add --dev @types/bcrypt

## To run postgresql from docker 

## (docker-desktop must be running in background)

docker-compose up 

## Adding sequelize ORM for PGSQL

yarn add sequelize pg mysql2

yarn add --dev sequelize-cli

npx sequelize-cli init

npx sequelize-cli migration:generate --name create-users-table

npx sequelize db:migrate

## On config/config.json

## Taking reference from docker-compose.yml

{
  "username": "root",
  "password": "root",
  "database": "user_service",
  "host": "127.0.0.1",
  "dialect": "postgres",
  "port": 5433
}

npx sequelize-cli db:migrate


## create an IAM user and accesskey

aws configure

## Default region name [ap-south-1]: 

## Default output format [None]: json



## To run the app

yarn run dev

docker-compose up