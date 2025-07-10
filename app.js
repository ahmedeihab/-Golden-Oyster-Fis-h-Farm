// Language management
class LanguageManager {
  constructor() {
    this.currentLanguage = localStorage.getItem('preferred-language') || 'ar';
    this.init();
  }

  init() {
    const toggleButton = document.getElementById('languageToggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => this.toggleLanguage());
      this.setLanguage(this.currentLanguage);
    }
  }

  toggleLanguage() {
    const newLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
    this.setLanguage(newLanguage);
  }

  setLanguage(language) {
    this.currentLanguage = language;
    const html = document.documentElement;
    
    // Update HTML attributes
    html.setAttribute('lang', language);
    html.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    
    // Update all elements with data attributes
    this.updateTextContent(language);
    this.updateTitle(language);
    
    // Store preference
    localStorage.setItem('preferred-language', language);
  }

  updateTextContent(language) {
    const elements = document.querySelectorAll('[data-ar][data-en]');
    elements.forEach(element => {
      const text = element.getAttribute(`data-${language}`);
      if (text) {
        if (element.tagName === 'INPUT' && element.type === 'submit') {
          element.value = text;
        } else if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
          element.placeholder = text;
        } else {
          element.textContent = text;
        }
      }
    });
  }

  updateTitle(language) {
    const titleElement = document.querySelector('title[data-ar][data-en]');
    if (titleElement) {
      const title = titleElement.getAttribute(`data-${language}`);
      if (title) {
        document.title = title;
      }
    }
  }
}

// Smooth scrolling for navigation
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', this.handleClick.bind(this));
    });
  }

  handleClick(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
}

// Counter animation
class CounterAnimation {
  constructor() {
    this.init();
  }

  init() {
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length > 0) {
      this.observeCounters(counters);
    }
  }

  observeCounters(counters) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      const numberElement = element.querySelector('.highlight__number');
      if (numberElement) {
        numberElement.textContent = Math.floor(current);
      }
    }, 16);
  }
}

// Contact form handling
class ContactForm {
  constructor() {
    this.init();
  }

  init() {
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', this.handleSubmit.bind(this));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show success message
    this.showMessage('success', 'تم إرسال رسالتك بنجاح!', 'Message sent successfully!');
    
    // Reset form
    e.target.reset();
  }

  showMessage(type, messageAr, messageEn) {
    const currentLang = document.documentElement.getAttribute('lang');
    const message = currentLang === 'ar' ? messageAr : messageEn;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `status status--${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      padding: 16px 24px;
      border-radius: 8px;
      font-weight: 500;
      background: #10b981;
      color: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
      messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      messageDiv.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(messageDiv)) {
          document.body.removeChild(messageDiv);
        }
      }, 300);
    }, 3000);
  }
}

// Header scroll effect
class HeaderScroll {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
    }
  }
}

// Intersection Observer for animations
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    const animatedElements = document.querySelectorAll('.service__card, .feature, .benefit, .highlight__stat');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
          entry.target.style.opacity = '1';
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      observer.observe(element);
    });
  }
}

// WhatsApp and TikTok button handlers
class SocialMediaHandlers {
  constructor() {
    this.init();
  }

  init() {
    // Handle WhatsApp buttons
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    whatsappButtons.forEach(button => {
      button.addEventListener('click', this.handleWhatsAppClick.bind(this));
    });

    // Handle TikTok button
    const tiktokButtons = document.querySelectorAll('.tiktok-btn, .tiktok-link');
    tiktokButtons.forEach(button => {
      button.addEventListener('click', this.handleTikTokClick.bind(this));
    });
  }

  handleWhatsAppClick(e) {
    console.log('WhatsApp button clicked');
  }

  handleTikTokClick(e) {
    console.log('TikTok button clicked');
  }
}

// Mobile menu handling
class MobileMenu {
  constructor() {
    this.init();
  }

  init() {
    const mobileBreakpoint = 768;
    
    window.addEventListener('resize', () => {
      if (window.innerWidth <= mobileBreakpoint) {
        this.handleMobileLayout();
      } else {
        this.handleDesktopLayout();
      }
    });
    
    // Initial check
    if (window.innerWidth <= mobileBreakpoint) {
      this.handleMobileLayout();
    }
  }

  handleMobileLayout() {
    const nav = document.querySelector('.header__nav');
    if (nav) {
      nav.style.display = 'none';
    }
  }

  handleDesktopLayout() {
    const nav = document.querySelector('.header__nav');
    if (nav) {
      nav.style.display = 'flex';
    }
  }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  const languageManager = new LanguageManager();
  const smoothScroll = new SmoothScroll();
  const counterAnimation = new CounterAnimation();
  const contactForm = new ContactForm();
  const headerScroll = new HeaderScroll();
  const scrollAnimations = new ScrollAnimations();
  const socialMediaHandlers = new SocialMediaHandlers();
  const mobileMenu = new MobileMenu();

  // Add loading animation
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

  // Add scroll to top functionality
  const scrollTopButton = document.createElement('button');
  scrollTopButton.innerHTML = '↑';
  scrollTopButton.className = 'scroll-top';
  scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0891b2 0%, #059669 100%);
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    z-index: 1000;
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;
  
  document.body.appendChild(scrollTopButton);
  
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopButton.style.opacity = '1';
      scrollTopButton.style.transform = 'scale(1)';
    } else {
      scrollTopButton.style.opacity = '0';
      scrollTopButton.style.transform = 'scale(0.8)';
    }
  });

  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('.btn, .service__card, .feature, .benefit, .highlight__stat');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      if (!element.style.transform.includes('scale')) {
        element.style.transform = 'translateY(-2px)';
      }
    });
    
    element.addEventListener('mouseleave', () => {
      if (!element.style.transform.includes('scale')) {
        element.style.transform = 'translateY(0)';
      }
    });
  });

  console.log('Golden Oyster Fish Farm website initialized successfully!');
});
