
export const formatDate = (date='') => {
    let dateTemp = date.split('-');
    let dateFinal = '';
    dateTemp.slice().reverse().forEach(element => {
        dateFinal=dateFinal.concat(element);
        if(element !== dateTemp[0]){
            dateFinal=dateFinal.concat('-');
        }
    });
    return dateFinal;
}