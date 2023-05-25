import axios from "axios";

export class BookingService{
    baseUrl = "http://localhost:8080/booking/";

    getAll(){
        return axios.get(this.baseUrl + "all").then(res => res.data);
    }
    save(booking) {
        return axios.post(this.baseUrl + "saveBooking", booking).then(res => res.data);
    }
}