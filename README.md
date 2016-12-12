# Node Survey

## Introduction
An example survey app build on [Express](http://expressjs.com/), [Sequelize](http://sequelizejs.com/) and [Twitter Bootstrap](http://getbootstrap.com/).

## Requirements
Requires Node.JS v0.10.46 and MySQL.

## Installation
Clone the repo
```
git clone https://github.com/fullstackadam/node_survey.git
```
Install the dependencies
```
cd node_survey
npm install
```
Create a mysql database
```
mysql -u user -p
create schema node_survey
```
Adjust the values in .env-example
```
DB_USER=root
DB_PASS=password
DB_HOST=localhost
DATABASE=node_survey

#admin
ADMIN_NAME=Fiddy
ADMIN_EMAIL=fiddy@gunit.com
ADMIN_PASSWORD=50cent
```

Rename the .env-example file to .env
```
mv .env-example .env
```
Start the server
npm start