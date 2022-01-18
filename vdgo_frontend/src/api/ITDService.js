import HTTP from "./common";

export const ITDService = { 
    

    list () {
        return HTTP.get('/itd.json')
            .then(res => res.data.data);
        }
}