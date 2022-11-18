// функция склонения окончаний

export default function wordForm (n, text_form) {  
    n = Math.abs(n) % 100; 
    let n1 = n % 10;
    if (n > 10 && n < 20) { return text_form[2]; }
    if (n1 > 1 && n1 < 5) { return text_form[1]; }
    if (n1 == 1) { return text_form[0]; }
    return text_form[2];
}