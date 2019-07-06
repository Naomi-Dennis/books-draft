# Simplicity Book Reader 

## Getting Started 

Please follow the instructions below, to run a local version of Simplicity. 

### Or 

Run the live version [here](https://stark-wave-13030.herokuapp.com/)

## Prerequisites

`npm`

## For MacOS / Linux Users

#### NVM
Install npm using the [nvm](https://github.com/nvm-sh/nvm)

## Apt 
```
sudo apt update
sudo apt install nodejs
sudo apt install npm
```

## For Windows Users

[Download the executable here](https://nodejs.org/en/download/)

## Installation

Clone this repository. In the root folder, use `npm install`


## Running the Test

In the root folder, use `npm test`

## Deployment 

### Configuring to run in localhost 

On line 31 in session_controller, change current_domain to test_domain 


On line 78 in the google_books_controller, change current_domain to test_domain 

```
let current_domain = test_domain
```

In the root folder, use `npm start`

## Built With

* ExpressJS 
* Heroku
