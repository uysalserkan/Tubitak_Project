import {QRCodeModel} from "./models/QRCodeModel";
import axios from "axios";
import {MessageResponse} from "../dto/MessageResponse";
import {EventQueryResponse} from "./EventAPI";
import {AuthAPI} from "./AuthAPI";

const authAPI = new AuthAPI();

export class QRCodeAPI {


    async getQRCode(eventId: Number, tcNo: String): Promise<QRCodeModel> {
        const response = await axios.get(`http://localhost:8080/qrcode/${eventId}/${tcNo}`)
        return response.data;
    }

    async sendQRCode(eventId: Number, tcNo: String, email: String): Promise<MessageResponse> {
        const response = await axios.post(`http://localhost:8080/qrcode/mail?eventId=${eventId}&tcno=${tcNo}&email=${email}`)
        // http://localhost:8080/qrcode/mail?eventId=24&tcno=12345678910&email=uysalserkan08@gmail.com
        return response.data

    }

    async getAllEventRegistered(tcNo: String): Promise<EventQueryResponse[]> {
        const response = await axios.get(`http://localhost:8080/qrcode/${tcNo}`);
        return response.data;
    }

    async getAll(): Promise<QRCodeModel[]> {
        const response = await axios.get(`http://localhost:8080/qrcode`, {headers: authAPI.getHeader()});
        return response.data;
    }

    async deleteByTcNoAndEventId(tcNo: String, eventId: Number): Promise<MessageResponse> {
        const response = await axios.delete(`http://localhost:8080/qrcode/${tcNo}/${eventId}`, {headers: authAPI.getHeader()})
        return response.data;
    }
}