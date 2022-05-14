import $api from "../http";
import {AxiosResponse} from "axios";

export default class RouteService {
    static async getFlights(data : ScheduleQuery): Promise<AxiosResponse<ScheduleResponse>> {
        return $api.post<ScheduleResponse>('routes/schedule', data);
    }
}