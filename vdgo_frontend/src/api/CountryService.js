
import HTTP from "./common";

export const CountryService = { 


    list () {
        return HTTP.get('/countries.json')
            .then(res => res.data.data);
        }
}
