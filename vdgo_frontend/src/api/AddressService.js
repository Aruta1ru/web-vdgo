import HTTP from "./common";

export const AddressService = { 


    list () {
        return HTTP.get('/addresses.json')
            .then(res => res.data.data);
        } 

}

    