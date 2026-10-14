//Get the menu from one local file instead of repeating it on every page.
async function loadNavbar() {
    const navbar = document.getElementById('navbar');
    try {
        const response = await fetch('nav.html');
        if (!response.ok) {
            throw new Error('Navigation could not be loaded.');
        }
        navbar.innerHTML = await response.text();

        //Mark the current page for both visual users and screen reader users.
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navbar.querySelectorAll('.nav-link').forEach(function (link) {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    } catch (error) {
        //Leave the original fallback links available if the request fails.
        console.error(error);
    }
}
loadNavbar();