import HTTP from "./common";

export const ReasonsService = { 


    list () {
        return HTTP.get('/reasons.json')
            .then(res => res.data.data);
        }
}
