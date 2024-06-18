# Client

![image](https://user-images.githubusercontent.com/110283090/234471733-590e2342-b4e4-4e00-acee-00c521b2f39c.png)

This a client site of Vershina web shop. It war written by me to better understand Angular.
Vershina

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/` or other port if the previous one is already in use or u run this app over https protocol. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Usage

To use the UI repository, you can follow these steps:

1. Run the command ng serve to start the development server.
2. Navigate to http://localhost:4200/ in your browser to see the application running.
3. If u want to run this app over https protocol, create ssl folder,  use mkcert or other suitable tools to generate a key and add the following code snippet to angular.json in a section "serve"
```json
  "options": {
    "sslCert": "ssl/localhost.pem",
    "sslKey": "ssl/localhost-key.pem",
    "ssl": true
  }
```

## TODO

1. Unit tests
2. More styling to the entire app, and in particular, to the admin panel
3. More functional to admin panel and make it more comfortable
