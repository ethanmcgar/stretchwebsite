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

// EmailJS Configuration
// Note: Public Key is set in index.html as window.EMAILJS_PUBLIC_KEY
// Update it there if you need to change it
const EMAILJS_CONFIG = {
    serviceId: 'service_5bx7shp',
    templateId: 'template_nr6m35d',
    recipientEmail: 'aidanstretch01@gmail.com' // The email address that will receive contact form submissions
};

/* 
 * EMAILJS SETUP INSTRUCTIONS:
 * 
 * To ensure emails are sent correctly, you need to configure your EmailJS template:
 * 
 * 1. Go to https://dashboard.emailjs.com/
 * 2. Navigate to Email Templates
 * 3. Open template ID: template_nr6m35d
 * 4. In the template settings, configure:
 *    - "To Email" field: Set to {{to_email}} OR set it statically to aidanstretch01@gmail.com
 *    - "From Name": {{from_name}}
 *    - "Reply To": {{reply_to}}
 *    - "Message": {{message}}
 * 
 * 5. Make sure your EmailJS service (service_5bx7shp) is connected to an email provider
 *    (Gmail, Outlook, etc.) and is active
 * 
 * 6. Test the form and check the browser console (F12) for detailed error messages
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

    // Handle form submission via EmailJS
    if (contactModalForm) {
        contactModalForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Verify EmailJS is loaded and initialized
            if (typeof emailjs === 'undefined') {
                let errorMsg = 'Error: EmailJS is not loaded. ';
                if (window.emailjsLoadError) {
                    errorMsg += 'The EmailJS script failed to load. This may be due to Cloudflare security settings blocking external scripts.';
                } else {
                    errorMsg += 'Please check your internet connection and refresh the page.';
                }
                alert(errorMsg);
                console.error('EmailJS is not defined. Make sure the EmailJS script is loaded.');
                console.error('If using Cloudflare, check Content Security Policy settings in Cloudflare dashboard.');
                return;
            }
            
            // Check if EmailJS is initialized (has a send method)
            if (typeof emailjs.send !== 'function') {
                let errorMsg = 'Error: EmailJS is not fully initialized. ';
                if (!window.emailjsReady) {
                    errorMsg += 'EmailJS may still be loading. Please wait a moment and try again.';
                } else {
                    errorMsg += 'There may be a configuration issue.';
                }
                alert(errorMsg);
                console.error('EmailJS.send is not available. EmailJS may not be initialized yet.');
                return;
            }

            // Get form data
            const formData = new FormData(contactModalForm);
            
            // Validate form data
            const fromName = formData.get('from_name');
            const replyTo = formData.get('reply_to');
            const message = formData.get('message');
            
            if (!fromName || !replyTo || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Prepare template parameters
            // Note: If your EmailJS template uses a static "To Email" configured in the dashboard,
            // you don't need to pass to_email. If your template uses {{to_email}}, include it.
            const templateParams = {
                from_name: fromName,
                reply_to: replyTo,
                message: message,
                to_email: EMAILJS_CONFIG.recipientEmail
            };

            // Show sending state
            const submitButton = contactModalForm.querySelector('button[type="submit"]');
            let originalButtonText = '';
            
            if (submitButton) {
                originalButtonText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }

            // Debug: Log what we're sending
            console.log('Sending email with params:', templateParams);
            console.log('EmailJS Config:', EMAILJS_CONFIG);

            // Send email using EmailJS
            emailjs
                .send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
                .then((response) => {
                    console.log('Email sent successfully!', response);
                    console.log('Response status:', response.status);
                    console.log('Response text:', response.text);
                    alert('Thank you — your message has been sent to ' + EMAILJS_CONFIG.recipientEmail + '!');
                    contactModalForm.reset();
                    closeModal();
                })
                .catch((error) => {
                    console.error('EmailJS error details:', error);
                    console.error('Error status:', error.status);
                    console.error('Error text:', error.text);
                    
                    let errorMessage = 'Sorry, something went wrong sending your message.';
                    if (error.text) {
                        errorMessage += '\n\nError: ' + error.text;
                    }
                    if (error.status === 400) {
                        errorMessage += '\n\nThis usually means the EmailJS template is not configured correctly.';
                        errorMessage += '\nPlease check that your template uses the correct variable names.';
                    }
                    alert(errorMessage);
                })
                .finally(() => {
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText;
                    }
                });
        });
    }
});



