# Mohammed Thouheed — DevOps Portfolio Website

A fully responsive, futuristic portfolio template built with **HTML**, **CSS**, and **JavaScript**.  
Designed for Azure DevOps & Cloud Engineers — easy to customize and deploy.

---

## Technologies Used

- HTML5
- CSS3 (custom properties, glassmorphism, animations)
- Vanilla JavaScript (no frameworks)

---

## Repository Structure

```
|-index.html
|-style.css
|-script.js
|-Readme.md
|-asserts/
    |-profile.png
    |-Mohammed_Thouheed_Resume.pdf
    |-certifications/
        |-HTML5 CSS3 and JavaScript.jpg
        |-GIT, GitLab, GitHub Fundamentals.jpg
        |-Institute of Management,Technology & Finance.jpg
        |-Introduction to Python_certificate.jpg.jpeg
        |-Python Intermediate_certificate.jpg.jpeg
        |-internship-completion.jpg        ← Place your internship certificate here
    |-projects/
        |-Dockerized Project.png
        |-Heart Disease Prediction.png
        |-Portfolio website.png
        |-PayTm Clone.png
```

---

## Sections

| Section | Description |
|---|---|
| **Home / Hero** | Animated intro with typing effect, profile card & Resume download |
| **About** | Bio, DevOps skill bars, tools & availability cards |
| **Education** | Academic timeline (10th, Intermediate, B.Tech) with progress bars |
| **Internships** | ⭐ NEW — Internship cards with role, company, tech tags & clickable certificate image (click to enlarge) |
| **Projects** | Filterable project cards with GitHub links |
| **Certifications** | Certificate gallery — click any image to enlarge via lightbox modal |
| **Contact** | Contact form + social links |

---

## Features

- ⚡ Futuristic neon DevOps UI
- 🎇 Animated particle canvas background
- 🖱️ Cursor glow & custom cursor ring
- 🃏 3D hover tilt effects on cards
- 🔍 Click-to-enlarge image lightbox modal (for certs & internship certificates)
- 📜 Scroll reveal animations
- 🌗 Dark / Light theme toggle
- 📧 Functional email contact form
- 📱 Fully responsive & mobile-friendly
- ⬇️ Resume download button

---

## Customization Guide

### Adding an Internship

In `index.html`, find the `<!-- INTERNSHIPS -->` section and edit:

```html
<h3 class="intern-role">Your Job Title</h3>
<p class="intern-company">Company Name</p>
<span class="intern-duration">Month Year – Month Year</span>
<p class="intern-desc">Describe what you did...</p>
```

Replace the certificate image:
```
asserts/certifications/internship-completion.jpg
```

### Click-to-Enlarge Images

Any `<img>` with the class `zoom-img` and `data-full` / `data-title` attributes will open in the lightbox when clicked:

```html
<img class="zoom-img"
     src="/asserts/certifications/your-cert.jpg"
     data-full="/asserts/certifications/your-cert.jpg"
     data-title="Certificate Title"
     alt="Certificate" />
```

### Resume

Place your resume PDF at:
```
asserts/Mohammed_Thouheed_Resume.pdf
```

---

## Deployment

Compatible with GitHub Pages, Azure Static Web Apps, Vercel, Netlify, or any static host.
