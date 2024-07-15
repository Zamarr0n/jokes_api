const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Family Api",
        description: "Family API"
    },
    host: "localhost:3500",
    schemes:['http','https']
}

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

//This line of code will generate swagger.json
swaggerAutogen(outputFile,endpointsFile,doc);