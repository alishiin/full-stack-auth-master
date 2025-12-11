
import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API de Usuarios",
    description: "Documentación de la API de un servicio node.js",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc);