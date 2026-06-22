import pagination from "./utils.js";

const form = document.getElementById('contact-form');

const inputs = [...document.getElementsByTagName('input')];

const submitBtn = document.getElementById('submit-btn');



pagination();

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
        setTimeout(submitFunction, 5000);
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

function successToast(){
    swal(
        'Service reservé',
        'Nous vous contacterons dés que possible',
        'success'
    )
}

function submitFunction(){
    form.submit();
}