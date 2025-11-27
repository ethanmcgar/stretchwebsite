// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Form submission handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        alert(`Thank you for your message, ${name}! Your message has been received.`);
        
        contactForm.reset();
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.timeline-item, .skill-item, .publication-card, .education-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Scroll to top button
let scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #000000;
    color: white;
    border: 2px solid white;
    cursor: pointer;
    font-size: 1.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.15);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-5px)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
});



/* -------------------------------------------
   ✔ Dynamic "time ago" for video-thumbnail-date
-------------------------------------------- */

function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now - past) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const key in intervals) {
        const interval = Math.floor(seconds / intervals[key]);
        if (interval >= 1) {
            return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
        }
    }
    return "Just now";
}

document.querySelectorAll(".video-thumbnail-date").forEach(el => {
    const date = el.getAttribute("data-published");
    if (date) {
        el.textContent = timeAgo(date);
    }
});

/* -----------------------------
   Contact Modal + mailto send
----------------------------- */

/* -----------------------------
   Contact Modal + EmailJS send
----------------------------- */

/* 
 * FORMSUBMIT SETUP:
 * 
 * No setup needed! The form is already configured to send emails to:
 * aidanstretch01@gmail.com
 * 
 * FormSubmit is completely free and requires no API keys or registration.
 * Just update the email address in the form action URL if needed.
 * 
 * That's it - pure HTML form submission with zero configuration!
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactButton = document.getElementById('contactButton');
    const contactModal = document.getElementById('contact-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const contactModalForm = document.getElementById('contactModalForm');

    // Open modal
    if (contactButton && contactModal) {
        contactButton.addEventListener('click', () => {
            contactModal.classList.add('open');
            if (contactModalForm) contactModalForm.reset();
        });
    }

    // Close modal helpers
    function closeModal() {
        if (contactModal) {
            contactModal.classList.remove('open');
        }
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal && contactModal.classList.contains('open')) {
            closeModal();
        }
    });

    // Handle form submission via FormSubmit (simple HTML form - no API keys needed!)
    if (contactModalForm) {
        contactModalForm.addEventListener('submit', (e) => {
            // Validate form before submission
            const name = contactModalForm.querySelector('#modal-name').value;
            const email = contactModalForm.querySelector('#modal-email').value;
            const message = contactModalForm.querySelector('#modal-message').value;
            
            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return;
            }

            // Show sending state
            const submitButton = contactModalForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }

            // Set redirect URL to close modal after successful submission
            const nextInput = contactModalForm.querySelector('input[name="_next"]');
            if (nextInput) {
                // Redirect to same page with success parameter, then close modal
                nextInput.value = window.location.href + '?form=success';
            }

            // Form will submit naturally to FormSubmit
            // After redirect, we'll close the modal
            setTimeout(() => {
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.get('form') === 'success') {
                    alert('Thank you — your message has been sent!');
                    contactModalForm.reset();
                    closeModal();
                    // Clean up URL
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            }, 100);
        });
    }
});



