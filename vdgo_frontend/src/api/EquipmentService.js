import HTTP from "./common";

export const EquipmentService = { 


    list () {
        return HTTP.get('/equipment.json')
            .then(res => res.data.data);
        }
}

    