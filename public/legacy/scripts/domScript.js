import pagination from "./utils.js";

const form = document.getElementById('contact-form');

const inputs = [...document.getElementsByTagName('input')];
const ePaiement = document.getElementById('e_paiement');
const surPlace = document.getElementById('sur_place');
const total = document.getElementById('total');

const submitBtn = document.getElementById('submit-btn');

const calendly = document.getElementById('calendly');

pagination();

const totalFinal = parseFloat(total.innerText);
total.innerText = "Total à payer : " + total.innerText + " Da";


ePaiement.addEventListener("click", event => {
    if(ePaiement.checked){
        document.getElementById("reduction").classList.remove("hidden-elt");
        console.log("ePaiement")
        total.innerText = 'Total à payer : ' + parseFloat(totalFinal - totalFinal*10/100) + " Da";
    }
    
})

surPlace.addEventListener("click", event => {
    if(surPlace.checked){
        document.getElementById("reduction").classList.add("hidden-elt");
        console.log("surPlace")
        total.innerText = 'Total à payer : ' + totalFinal + " Da";
    }
})

submitBtn.addEventListener("click", event =>{
    let test = false

    inputs.forEach(value => { 
        if(value.value == ""){
            test = true;
        }

    }) 
    
    if(test){
        console.log("Form with empty value(s)")
        toastFunction();
    }else{
        successToast();
        setTimeout(submitFunction, 4000);

        ;
    }
})

// Toast function
function toastFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  } 
// Email check function
function toastFunction2() {
    // Get the snackbar DIV
    var x = document.getElementById("email-check");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
  } 

function successToast(){
    swal(
        'Formulaire envoyé',
        'Nous vous contacterons dés que possible',
        'success'
    )
}

function submitFunction(){
    form.submit();
}