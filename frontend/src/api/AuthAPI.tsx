import axios from "axios";
import {LoginModel} from "./models/LoginModel";

export class AuthAPI {
    async loginAdmin(admin: LoginModel) {
        const response = await axios.post(`http://localhost:8080/auth/login`, admin)
        localStorage.setItem("Authorization", JSON.stringify(response.data));
        return response.data;
    }

    logout() {
        localStorage.removeItem("Authorization");
    }

    getToken() {
        // @ts-ignore
        const admin = JSON.parse(localStorage.getItem("Authorization"));
        return admin.token;
    }

    getHeader() {
        // @ts-ignore
        const admin = JSON.parse(localStorage.getItem('Authorization'));

        if (admin && admin.token) {
            return {"Authorization": `Bearer ${admin.token}`};
        } else {
            return {};
        }
    }
}