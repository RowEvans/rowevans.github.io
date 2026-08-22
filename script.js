const trigger = document.querySelector('.nav-dropdown-trigger');
const menu = document.querySelector('.dropdown-menu');

trigger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open')
    trigger.setAttribute('aria-expanded', isOpen)
});

document.addEventListener('click', (e) => {
    if (!e.target.closets('.nav-dropdown')) {
        menu.classList.remove('open')
        trigger.setAttribute('aria-expanded', 'false')
    }
})