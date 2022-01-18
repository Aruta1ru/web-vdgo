import HTTP from "./common";

export const ExecutorService = { 


    list () {
        return HTTP.get('/executor.json')
            .then(res => res.data.data);
        }
}
