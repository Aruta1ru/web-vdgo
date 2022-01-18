import HTTP from "./common";

export const ImageService = { 
    

    list () {
        return HTTP.get('/images.json')
            .then(res => res.data.data);
        }
}