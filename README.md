# Angular Diary
This project is built by Danish Ahmed.

## Getting Started
###  Install Dependencies
Run the below command to install project dependencies.
```
npm install
```

###  Serve UI
**Serve In Development Mode**<br>
Run the below command to serve the UI on `http://localhost:4200/`.
```
ng serve
```
The app will automatically reload if you change any of the source files.
Use the `--prod` flag for a development build having same parameters as in production mode
and `--aot` flag for ahead of time compilation.

### Build UI
**Build The UI To Serve On Your Own Server**<br>
Run the below command to build the UI for production.

```
ng build
```

The build artifacts will be stored in the `dist/` directory.
Use the `--prod` flag for a production build and `--aot` flag for ahead of time compilation.


### Generating UI Documentation
1. Run the following command to generate the documentation in the ui/documentation directory.
   ```
   npm run generateDoc
   ```
2. Run the following command to serve the documentation and navigate to http://127.0.0.1:8080 in your browser
   ```
   npm run serveDoc
   ```
