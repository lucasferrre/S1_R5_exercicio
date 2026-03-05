import express from "express";
import {EnvVar} from "./config/envVar"
const app = express();



app.listen(EnvVar.SERVER_PORT, ()=> {
    console.log(`Servidor rodando em http://localhost:${EnvVar.SERVER_PORT}`)
})