import {QRCodeModel} from "./models/QRCodeModel";
import axios from "axios";

export class QRCodeAPI {
    async getQRCode(eventId: Number, tcNo: String): Promise<QRCodeModel> {
        const response = await axios.get(`http://localhost:8080/qrcode/${eventId}/${tcNo}`)
        return response.data;
    }
}