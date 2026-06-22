export default function pagination(){
    const nextButton = document.getElementById('next-button');
    const previousButton = document.getElementById('prev-button');

    const nextButton2 = document.getElementById('next-button2');
    const previousButton2 = document.getElementById('prev-button2');

    const pageOne = document.getElementsByClassName('page-one');
    const pageTwo = document.getElementsByClassName('page-two');
    const pageThree = document.getElementsByClassName('page-three');

    const pagination1 = document.getElementById('pagination-1');
    const pagination2 = document.getElementById('pagination-2');
    const pagination3 = document.getElementById('pagination-3');

    const inputs = [...document.getElementsByTagName('input')];

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let email = '';

    nextButton.addEventListener("click", event => {
        event.preventDefault();
        inputs.forEach(input => {
    
            if(input.type == "email"){
                email = input.value;
            }
        
        }) 
        if(email.match(mailformat)){
            pageOne[0].classList.add('hidden-page');
            pageTwo[0].classList.remove('hidden-page');
            pagination1.classList.remove('active');
            pagination2.classList.add('active')
        }
        else{
            toastFunction2();
        }
    })
    
    previousButton.addEventListener("click", event => {
        event.preventDefault();
        pageOne[0].classList.remove('hidden-page');
        pageTwo[0].classList.add('hidden-page');
        pagination1.classList.add('active');
        pagination2.classList.remove('active')
    })
    
    nextButton2.addEventListener("click", event => {
        event.preventDefault();
        pageTwo[0].classList.add('hidden-page');
        pageThree[0].classList.remove('hidden-page');
        pagination2.classList.remove('active');
        pagination3.classList.add('active')
        const recap = document.getElementById("recap");
        const horaire = document.querySelector('input[name="horaire"]:checked').value;

        if(horaire==='Matin' || horaire==='Apres-Midi'){
            total.innerText = 'Total à payer : 5000 Da';
        }
        else{
            total.innerText = 'Total à payer : 8000 Da';
        }
        recap.innerText = horaire;

    })
    
    previousButton2.addEventListener("click", event => {
        event.preventDefault();
        pageTwo[0].classList.remove('hidden-page');
        pageThree[0].classList.add('hidden-page');
        pagination2.classList.add('active');
        pagination3.classList.remove('active')
    })

    // Email check function
    function toastFunction2() {
        // Get the snackbar DIV
        var x = document.getElementById("email-check");
    
        // Add the "show" class to DIV
        x.className = "show";
    
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    } 
    
}