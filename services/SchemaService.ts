import {AxiosResponse} from "axios";
import $api from "../http";

export default class SchemaService {
    static async getSchema(vehicleId: number) : Promise<AxiosResponse<Schema>> {
        return $api.get<Schema>(`/schemas/vehicle/${vehicleId}`);
    }
}