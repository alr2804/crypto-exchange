import numeral from 'numeral'



const percentFilter = function(value) {
    if (!value){
        return '0%'
    }
    return `${Number(value).toFixed(2)} %`

}

const dollarFilter = function(value) {
    if (!value){
        return '$ 0';
    }
    
    return numeral(value).format('($ 0.00a)')
 
}


export {dollarFilter, percentFilter}