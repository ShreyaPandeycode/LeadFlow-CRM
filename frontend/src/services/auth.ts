import api from "./api";
import axios from "axios";

export function login(data: any) {

    return axios.post(
        "http://localhost:8080/login",
        data
    );

}