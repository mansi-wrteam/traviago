// ========================================
// Home Slideshow
// ========================================
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

// ========================================
// Navbar — Hamburger Toggle
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarClose = document.getElementById('navbarClose');
    const navbarOverlay = document.getElementById('navbarOverlay');
    const homeSection = document.getElementById('home');
    const navbarLogo = document.querySelector('.navbar__logo');

    if (navbarLogo && navbarLogo.dataset.darkSrc) {
        const darkLogoPreload = new Image();
        darkLogoPreload.src = navbarLogo.dataset.darkSrc;
    }

    function updateNavbarColor() {
        if (!navbar || !homeSection) return;
        const homeBottom = homeSection.getBoundingClientRect().bottom;
        const threshold = navbar.offsetHeight + 20;

        if (homeBottom > threshold) {
            navbar.classList.add('home-navbar');
        } else {
            navbar.classList.remove('home-navbar');
        }

        if (navbarLogo) {
            const lightSrc = navbarLogo.dataset.lightSrc;
            const darkSrc = navbarLogo.dataset.darkSrc;
            navbarLogo.src = navbar.classList.contains('home-navbar') ? lightSrc : darkSrc;
        }
    }

    function openSidebar() {
        navbarMenu.classList.add('sidebar-animate');
        navbarMenu.classList.add('is-active');
        navbarOverlay.classList.add('is-active');
        navbarToggle.classList.add('is-active');
        navbarToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        navbarMenu.classList.remove('is-active');
        navbarOverlay.classList.remove('is-active');
        navbarToggle.classList.remove('is-active');
        navbarToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    window.addEventListener('resize', function () {
        navbarMenu.classList.remove('sidebar-animate', 'is-active');
        navbarOverlay.classList.remove('is-active');
        navbarToggle.classList.remove('is-active');
        navbarToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });

    if (navbarToggle) {
        navbarToggle.addEventListener('click', function () {
            const isOpen = navbarMenu.classList.contains('is-active');
            isOpen ? closeSidebar() : openSidebar();
        });
    }

    if (navbarClose) {
        navbarClose.addEventListener('click', closeSidebar);
    }

    if (navbarOverlay) {
        navbarOverlay.addEventListener('click', closeSidebar);
    }

    if (navbarMenu) {
        navbarMenu.querySelectorAll('.navbar__link').forEach(link => {
            link.addEventListener('click', closeSidebar);
        });
    }

    updateNavbarColor();
    window.addEventListener('scroll', updateNavbarColor);
    window.addEventListener('resize', updateNavbarColor);
});


// ========================================
// Destinations Card Slider
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.destinations-cards');
    const prevButton = document.querySelector('.destinations .heading .icon:first-child');
    const nextButton = document.querySelector('.destinations .heading .icon:last-child');
    const items = track ? Array.from(track.children) : [];
    const gap = 24;
    let currentIndex = 0;

    function getVisibleCount() {
        return window.innerWidth <= 767 ? 2 : window.innerWidth <= 1024 ? 5 : 6;
    }

    function updateNavState() {
        const visibleCount = getVisibleCount();
        const maxIndex = Math.max(0, items.length - visibleCount);

        if (prevButton) prevButton.classList.toggle('disabled', currentIndex === 0);
        if (nextButton) nextButton.classList.toggle('disabled', currentIndex >= maxIndex);
    }

    function scrollToIndex(index) {
        const visibleCount = getVisibleCount();
        if (!track || items.length === 0) return;
        const maxIndex = Math.max(0, items.length - visibleCount);
        currentIndex = Math.min(Math.max(index, 0), maxIndex);
        const itemWidth = items[0].getBoundingClientRect().width;
        track.scrollTo({ left: currentIndex * (itemWidth + gap), behavior: 'smooth' });
        updateNavState();
    }

    if (prevButton) prevButton.addEventListener('click', () => scrollToIndex(currentIndex - 1));
    if (nextButton) nextButton.addEventListener('click', () => scrollToIndex(currentIndex + 1));

    updateNavState();
});


// ========================================
// Tours Slider
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById("slider");
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");

    function getleftwidth() {
        return window.innerWidth <= 767 ? 420 : window.innerWidth <= 1024 ? 400 : 420;
    }

    if (slider && next && prev) {
        next.addEventListener("click", () => slider.scrollBy({ left: getleftwidth(), behavior: "smooth" }));
        prev.addEventListener("click", () => slider.scrollBy({ left: -(getleftwidth()), behavior: "smooth" }));
        // next.addEventListener("click", () => slider.scrollBy({ left: 420, behavior: "smooth" }));
        // prev.addEventListener("click", () => slider.scrollBy({ left: -420, behavior: "smooth" }));
    }
});


// ========================================
// Testimonial Auto Slider
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll(".slide");
    const progress = document.querySelector(".progress-fill");
    const current = document.getElementById("current");

    if (!slides.length || !progress || !current) return;

    let index = 0;
    const total = slides.length;

    function showSlide(i) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[i].classList.add("active");
        current.textContent = String(i + 1).padStart(2, "0");
        progress.style.width = ((i + 1) / total) * 100 + "%";
    }

    setInterval(() => {
        index = (index + 1) >= total ? 0 : index + 1;
        showSlide(index);
    }, 4000);

    showSlide(index);
});


// ========================================
// Blog Read More / Read Less
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll(".read-more");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const content = button.previousElementSibling;
            content.classList.toggle("active");
            button.textContent = content.classList.contains("active") ? "Read Less" : "Read More";
        });
    });
});


// ========================================
// Footer — Mobile Accordion
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    function initFooterAccordion() {
        if (window.innerWidth > 767) return;

        document.querySelectorAll('.footer .column .heading').forEach(heading => {
            heading.addEventListener('click', function () {
                const isOpen = this.classList.contains('open');

                document.querySelectorAll('.footer .column .heading').forEach(h => {
                    h.classList.remove('open');
                    h.parentElement.querySelectorAll('ul, .newsletter-text, .newsletter').forEach(el => {
                        el.classList.remove('open');
                    });
                });

                if (!isOpen) {
                    this.classList.add('open');
                    this.parentElement.querySelectorAll('ul, .newsletter-text, .newsletter').forEach(el => {
                        el.classList.add('open');
                    });
                }
            });
        });
    }

    initFooterAccordion();

    window.addEventListener('resize', function () {
        document.querySelectorAll('.footer .column ul, .footer .column .newsletter-text, .footer .column .newsletter').forEach(el => {
            el.classList.remove('open');
        });
        document.querySelectorAll('.footer .column .heading').forEach(h => h.classList.remove('open'));
    });
});

// ========================================
// Active Nav Link
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const trackedIds = ['home', 'footer', 'destinations', 'tours'];

    const linkMap = {};
    trackedIds.forEach(id => {
        const link = document.querySelector('#navbarMenu a[href="#' + id + '"]');
        if (link) linkMap[id] = link;
    });

    const sections = trackedIds
        .map(id => document.getElementById(id))
        .filter(Boolean)
        .sort((a, b) => a.offsetTop - b.offsetTop);

    function setActive(id) {
        Object.values(linkMap).forEach(link => link.classList.remove('active'));
        if (id && linkMap[id]) linkMap[id].classList.add('active');
    }

    function updateActiveLink() {
        const navbarHeight = (document.querySelector('.navbar') || {}).offsetHeight || 0;
        const scrollY = window.scrollY + navbarHeight + 10;

        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 10) {
            setActive(sections[sections.length - 1].id);
            return;
        }

        let activeSection = sections[0];
        for (var i = 0; i < sections.length; i++) {
            if (sections[i].offsetTop <= scrollY) {
                activeSection = sections[i];
            }
        }

        setActive(activeSection.id);
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
});