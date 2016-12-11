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
'''
Adjust the values in .env-example
Rename the .env-example file to .env
```
mv .env-example .env
```
Start the server
npm start