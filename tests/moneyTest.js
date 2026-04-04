import formatCurrency from "../scripts/utils/money.js";


console.log('converts cents into dollar');


//Basic case
if(formatCurrency(2095) === '20.95'){
    console.log('passed');
}else{
    console.log('failed');
}

// Edge cases

console.log('works with 0');

if(formatCurrency(0) === '0.00'){
    console.log('passed');
}else{
    console.log('failed');
};

console.log('rounds up to the nearest cents');

if(formatCurrency(2000.5) === '20.01'){
    console.log('passed');
}else{
    console.log('failed');
};

if(formatCurrency(2000.4) === '20.00'){
    console.log('passed');
}else{
    console.log('failed');
};

// if(formatCurrency(0001) === '0.01'){
//     console.log('passed');
// }else{
//     console.log('failed');
// }