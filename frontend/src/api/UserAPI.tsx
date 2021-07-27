import axios from "axios";
import {UserModel} from "./models/UserModel";
import {MessageResponse} from "../dto/MessageResponse";

export interface UserQueryResponse {
    tcNo: String;
    firstName: String;
    lastName: String;
}

export class UserAPI {
    async getUsers(): Promise<UserQueryResponse[]> {
        const response = await axios.get(`http://localhost:8080/users`);
        return response.data;
    }

    async postUser(userModel: UserModel): Promise<MessageResponse> {
        const response = await axios.post("http://localhost:8080/users", userModel);
        return response.data;
    }

    async registerUserToEvent(id: number, userModel: UserModel): Promise<MessageResponse> {
        const response = await axios.post(`http://localhost:8080/users/${id}`, userModel);
        return response.data;
    }

    async findByTCNo(tcNo: String): Promise<UserQueryResponse> {
        const response = await axios.get(`http://localhost:8080/users/${tcNo}`);
        return response.data;
    }
}