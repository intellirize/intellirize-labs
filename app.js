// Particle Animation
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;
const connectionDistance = 150;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.6)';
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(6, 182, 212, ${1 - distance / connectionDistance})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Typing Animation
const phrases = [
    'Expert IT Staffing Solutions',
    'AI-Driven Talent Matching',
    'Seamless Team Integration',
    'Scalable Growth Solutions'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentPhrase = phrases[phraseIndex];
    const typingElement = document.getElementById('typingText');
    
    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeText, typingSpeed);
}

setTimeout(typeText, 500);

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('scrollProgress').style.width = scrollPercent + '%';
    
    // Header shrink on scroll
    const header = document.getElementById('header');
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (scrollTop > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Skill Category Toggle
function toggleSkillCategory(element) {
    element.classList.toggle('active');
}

// Save Job
let jobSaved = false;
document.getElementById('saveJob').addEventListener('click', function() {
    jobSaved = !jobSaved;
    this.textContent = jobSaved ? '❤️' : '🤍';
    showToast(jobSaved ? 'Job saved!' : 'Job removed from saved');
});

// Share Job
document.getElementById('shareJob').addEventListener('click', function() {
    if (navigator.share) {
        navigator.share({
            title: 'Solution Architect - Platform Engineering',
            text: 'Check out this amazing job opportunity at IntelliRize Labs!',
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard!');
    }
});

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 24px;
        background: rgba(30, 41, 59, 0.95);
        color: #06b6d4;
        padding: 16px 24px;
        border-radius: 12px;
        border: 1px solid #06b6d4;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// FAQ Data - Generic IntelliRize Capabilities
const faqs = [
    {
        question: "How does IntelliRize Labs' AI-driven recruitment work?",
        answer: "Our AI-powered matching system analyzes job requirements against candidate profiles, identifying the best matches based on technical skills, experience patterns, and cultural alignment. This proprietary technology ensures precise matching across all IT roles and specializations."
    },
    {
        question: "What types of IT professionals can IntelliRize Labs provide?",
        answer: "We provide a diverse range of IT talents including Software Engineers, Cloud Architects, DevOps Engineers, AI/ML Specialists, Data Scientists, Full Stack Developers, UI/UX Designers, QA Engineers, Cybersecurity Professionals, and Business Analysts. Our talent pool covers various experience levels and technology stacks."
    },
    {
        question: "What makes IntelliRize Labs' talent pool unique?",
        answer: "We maintain a curated network of pre-vetted IT professionals who undergo rigorous technical assessments, portfolio reviews, and interviews. Each candidate in our pool has proven experience with enterprise-scale projects and industry best practices. Our talent spans multiple specializations and geographies."
    },
    {
        question: "How fast can IntelliRize Labs find qualified candidates?",
        answer: "With our AI-driven process, we can identify and present qualified candidates within 24-48 hours. Our pre-screening and matching system eliminates manual resume screening, allowing us to focus on in-depth technical evaluations and interviews."
    },
    {
        question: "How do you ensure quality in your talent pool?",
        answer: "We employ a multi-layered vetting approach: technical certification verification, hands-on technical challenges, reference checks with past clients, and behavioral assessments. Every candidate is verified for their claimed expertise and track record of success."
    },
    {
        question: "Does IntelliRize Labs match candidates to specific project needs?",
        answer: "Yes. Our AI analyzes your specific project requirements—tech stack, timeline, team size, and skill levels—and matches candidates with directly relevant experience. We prioritize quality fit over speed, ensuring long-term success."
    },
    {
        question: "What's the difference between IntelliRize's AI matching and traditional recruitment?",
        answer: "Traditional recruiting relies on keyword matching and subjective evaluation. Our AI-driven approach analyzes behavioral patterns, skill depth, project complexity handled, and team dynamics. This results in faster identification of truly qualified candidates and significantly higher placement success rates."
    },
    {
        question: "What engagement models does IntelliRize Labs offer?",
        answer: "We offer flexible engagement models including full-time placements, contract-to-hire, short-term projects, and team augmentation. Our solutions scale from single specialists to entire teams, tailored to your specific business needs and timelines."
    }
];

const faqContainer = document.getElementById('faqContainer');
faqs.forEach((faq, index) => {
    const faqItem = document.createElement('div');
    faqItem.className = 'faq-item';
    faqItem.innerHTML = `
        <div class="faq-question">
            ${faq.question}
            <span class="faq-icon">▼</span>
        </div>
        <div class="faq-answer">${faq.answer}</div>
    `;
    faqItem.querySelector('.faq-question').addEventListener('click', function() {
        faqItem.classList.toggle('active');
    });
    faqContainer.appendChild(faqItem);
});

// Chatbot
const chatbotResponses = {
    greeting: "Hello! I'm IntelliRize AI Assistant. How can I help you today?",
    services: "IntelliRize provides AI-driven IT staffing and resourcing solutions. We specialize in matching top-tier IT talent across multiple domains including Cloud, DevOps, AI/ML, Data, Software Engineering, and more.",
    timeline: "We typically respond to inquiries within 24-48 hours. Our AI-driven matching process allows us to identify qualified candidates quickly, often completing placements in 2-3 weeks.",
    capabilities: "Our talent pool includes experts in AWS, Azure, Kubernetes, Python, Java, React, Angular, Salesforce, Data Science, Machine Learning, and many other technologies. We handle everything from individual specialists to entire team augmentation.",
    international: "Yes, we actively recruit internationally. We handle all compliance and legal requirements for global placements. Our network spans multiple continents.",
    contact: "You can reach us at: 📞 484-484-9815 | 📧 resumes@intellirize.com | 💬 WhatsApp: +1-484-484-9815"
};

document.getElementById('chatbotToggle').addEventListener('click', toggleChat);

function toggleChat() {
    const chatWindow = document.getElementById('chatbotWindow');
    chatWindow.classList.toggle('active');
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const messagesDiv = document.getElementById('chatMessages');
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user-message';
    userMsg.textContent = message;
    messagesDiv.appendChild(userMsg);
    
    input.value = '';
    
    // Generate bot response
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot-message';
        
        const lowerMessage = message.toLowerCase();
        let response = "I'm here to help! You can ask about our services, capabilities, hiring timeline, international recruitment, or how to contact us.";
        
        if (lowerMessage.includes('service') || lowerMessage.includes('what do') || lowerMessage.includes('provide')) {
            response = chatbotResponses.services;
        } else if (lowerMessage.includes('skill') || lowerMessage.includes('capabilit') || lowerMessage.includes('tech') || lowerMessage.includes('talent')) {
            response = chatbotResponses.capabilities;
        } else if (lowerMessage.includes('timeline') || lowerMessage.includes('how long') || lowerMessage.includes('process') || lowerMessage.includes('fast')) {
            response = chatbotResponses.timeline;
        } else if (lowerMessage.includes('international') || lowerMessage.includes('visa') || lowerMessage.includes('sponsor') || lowerMessage.includes('global')) {
            response = chatbotResponses.international;
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
            response = chatbotResponses.contact;
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            response = chatbotResponses.greeting;
        }
        
        botMsg.textContent = response;
        messagesDiv.appendChild(botMsg);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 500);
    
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

document.getElementById('chatInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
});

// Form Submissions
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('Message sent successfully! We\'ll get back to you soon.');
    this.reset();
});

document.getElementById('applyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('Application submitted successfully! We\'ll contact you within 24 hours.');
    closeApplyModal();
    this.reset();
});

// Apply Modal
function openApplyModal() {
    document.getElementById('applyModal').classList.add('active');
}

function closeApplyModal() {
    document.getElementById('applyModal').classList.remove('active');
}

// Close modal on outside click
document.getElementById('applyModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeApplyModal();
    }
});

// Smooth scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Mobile menu toggle
document.getElementById('mobileMenu').addEventListener('click', function() {
    const nav = document.querySelector('.nav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

// Scroll animations for service cards
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

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

console.log('🚀 IntelliRize Labs - Powered by AI-driven talent matching');