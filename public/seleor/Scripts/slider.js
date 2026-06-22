const container = document.querySelector('.works');
document.querySelector('.slider-edit').addEventListener('input', (e) => {
    container.style.setProperty('--position', `${e.target.value}%`);
})