# Aidan Stretch - Professional Portfolio

A modern, responsive portfolio website showcasing professional experience, publications, and achievements.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean, professional design with smooth animations
- **Smooth Scrolling**: Enhanced navigation with smooth scroll behavior
- **Interactive Elements**: Hover effects, animations, and dynamic interactions
- **Contact Form**: Functional contact form (frontend only - requires backend for full functionality)
- **Mobile Menu**: Hamburger menu for mobile devices

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript
- Google Fonts (Inter)

## Getting Started

### Prerequisites

No prerequisites needed! This is a static website that can be opened directly in a browser.

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser

That's it! The website is ready to use.

### Local Development Server (Optional)

For a better development experience, you can use a local server:

#### Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js (with http-server):
```bash
npx http-server
```

#### Using PHP:
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## File Structure

```
stevewebsite/
├── index.html      # Main HTML file
├── styles.css      # All CSS styles
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Customization

### Colors

The website uses CSS variables for easy theming. Edit the `:root` section in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --primary-dark: #1e40af;
    --secondary-color: #64748b;
    /* ... more variables */
}
```

### Content

- Edit `index.html` to update personal information, experience, publications, etc.
- Modify sections as needed to add or remove content

### Contact Form

The contact form uses EmailJS to send emails. To configure:

1. Set up an EmailJS account at https://www.emailjs.com/
2. Configure your EmailJS service and template
3. Update the EmailJS configuration in `script.js` (serviceId, templateId, recipientEmail)

#### Cloudflare Configuration

If hosting on Cloudflare Pages or Workers, ensure EmailJS scripts are allowed:

1. **Cloudflare Dashboard Settings:**
   - Go to your Cloudflare dashboard
   - Navigate to Security → WAF → Tools
   - Ensure "EmailJS" or external scripts aren't blocked
   - Check Security → Settings → Content Security Policy (if enabled)

2. **_headers file:**
   - The `_headers` file in the root directory configures CSP for Cloudflare Pages
   - It allows EmailJS scripts and API calls
   - Deploy this file with your site

3. **Troubleshooting:**
   - Open browser console (F12) and check for CSP errors
   - Verify EmailJS script loads: Look for "EmailJS script loaded successfully"
   - Check network tab to see if `cdn.emailjs.com` requests are blocked
   - If blocked, adjust Cloudflare security settings or CSP headers

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This portfolio template is free to use and modify for personal or commercial projects.

## Contact

- **LinkedIn**: [Aidan Stretch](https://www.linkedin.com/in/aidan-stretch-a8727822b/)
- **Publications**: [Muck Rack](https://muckrack.com/aidan-stretch/articles)

