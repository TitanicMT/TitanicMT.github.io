// Immediate function to ensure header visibility with direct inline styles
(function() {
    // Force header visibility by applying inline styles with highest priority
    const nav = document.querySelector('.main-nav');
    if (nav) {
        nav.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 999999 !important;
            visibility: visible !important;
            opacity: 1 !important;
            display: flex !important;
            background-color: var(--nav-bg) !important;
            width: 100% !important;
        `;
        nav.classList.add('js-fix-header');
        
        // Ensure main content doesn't hide under the header
        const main = document.querySelector('main');
        if (main) {
            main.style.paddingTop = '90px';
        }
    }
})();

// Add featured image section animations
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const options = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.textContent);
                const duration = 2000; // 2 seconds
                const steps = 50;
                const stepValue = targetValue / steps;
                let currentStep = 0;
                
                const counter = setInterval(() => {
                    currentStep++;
                    const progress = Math.min(currentStep / steps, 1);
                    const currentValue = Math.floor(progress * targetValue);
                    target.textContent = currentValue + "+";
                    
                    if (currentStep >= steps) {
                        clearInterval(counter);
                    }
                }, duration / steps);
                
                observer.unobserve(target);
            }
        });
    }, options);
    
    stats.forEach(stat => {
        observer.observe(stat);
    });
}

// Projects filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize stats animation
    animateStats();

    // Apply animation to project cards on page load
    const allProjectCards = document.querySelectorAll('.project-card');
    allProjectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.main-nav');
        
        // Force visibility with every scroll event
        nav.style.visibility = 'visible';
        nav.style.opacity = '1';
        nav.style.display = 'flex';
        
        // Apply appropriate styling based on scroll position
        if (window.scrollY > 50) {
            nav.style.padding = '10px 0';
            nav.style.boxShadow = 'var(--shadow-md)';
            nav.style.background = 'var(--nav-bg)';
            nav.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.padding = '16px 0';
            nav.style.boxShadow = 'var(--shadow)';
            nav.style.background = 'var(--nav-bg)';
            nav.style.borderBottom = 'none';
        }
    });
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add click event to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                // Show all projects if 'all' filter is selected
                if (filterValue === 'all') {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.classList.remove('hidden');
                    }, 10);
                } else {
                    // Get card categories
                    const categories = card.getAttribute('data-category').split(' ');
                    
                    // Check if card has the selected category
                    if (categories.includes(filterValue)) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.classList.remove('hidden');
                        }, 10);
                    } else {
                        card.classList.add('hidden');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300); // Match this with CSS transition time
                    }
                }
            });
        });
    });

    // Highlight Reel Functionality
    const highlightReel = document.querySelector('.highlight-reel-container');
    if (highlightReel) {
        const highlightReelSection = document.querySelector('.highlight-reel-section');
        
        // Show/hide scroll indicators based on scroll position
        function updateScrollIndicators() {
            const isScrolledLeft = highlightReel.scrollLeft <= 10;
            const isScrolledRight = highlightReel.scrollLeft >= (highlightReel.scrollWidth - highlightReel.offsetWidth - 10);
            
            // Update before pseudo-element (left indicator)
            highlightReelSection.style.setProperty('--left-indicator-opacity', isScrolledLeft ? '0' : '1');
            
            // Update after pseudo-element (right indicator)
            highlightReelSection.style.setProperty('--right-indicator-opacity', isScrolledRight ? '0' : '1');
        }
        
        // Set initial state
        updateScrollIndicators();
        
        // Update on scroll
        highlightReel.addEventListener('scroll', updateScrollIndicators);
        
        // Add keyboard navigation for accessibility
        highlightReel.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                highlightReel.scrollBy({ left: -300, behavior: 'smooth' });
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                highlightReel.scrollBy({ left: 300, behavior: 'smooth' });
                e.preventDefault();
            }
        });
        
        // Make cards focusable for keyboard navigation
        document.querySelectorAll('.highlight-card').forEach(card => {
            card.setAttribute('tabindex', '0');
        });
        
        // Resize observer for when window size changes
        const resizeObserver = new ResizeObserver(() => {
            updateScrollIndicators();
        });
        
        resizeObserver.observe(highlightReel);
    }
    
    // Dark mode functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    
    if (themeToggle && themeToggleMobile) {
        // Check for saved theme preference or respect OS preference
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        const currentTheme = localStorage.getItem("theme");
        
        // Apply theme preference
        if (currentTheme === "dark") {
            document.body.classList.add('dark-theme');
            updateThemeIcons(true);
        } else if (currentTheme === "light") {
            document.body.classList.remove('dark-theme');
            updateThemeIcons(false);
        } else if (prefersDarkScheme.matches) {
            document.body.classList.add('dark-theme');
            updateThemeIcons(true);
        }
        
        // Update moon/sun icons
        function updateThemeIcons(isDark) {
            const themeIcons = [
                themeToggle.querySelector('i'),
                themeToggleMobile.querySelector('i')
            ];
            
            themeIcons.forEach(icon => {
                if (isDark) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            });
        }
        
        // Theme toggle click handler
        function toggleTheme() {
            if (document.body.classList.contains('dark-theme')) {
                document.body.classList.remove('dark-theme');
                localStorage.setItem("theme", "light");
                updateThemeIcons(false);
            } else {
                document.body.classList.add('dark-theme');
                localStorage.setItem("theme", "dark");
                updateThemeIcons(true);
            }
        }
        
        // Event listeners for theme toggle
        themeToggle.addEventListener('click', toggleTheme);
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
    
    // Back to top button functionality
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile sidebar functionality
    const hamburger = document.getElementById('hamburgerMenu');
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeBtn = document.getElementById('closeSidebar');
    
    if (hamburger && sidebar && overlay && closeBtn) {
        // Toggle sidebar function
        function toggleSidebar() {
            sidebar.classList.toggle('active');
            overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
            document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
        }
        
        // Event listeners for mobile menu
        hamburger.addEventListener('click', toggleSidebar);
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                toggleSidebar();
                e.preventDefault();
            }
        });
        
        closeBtn.addEventListener('click', toggleSidebar);
        closeBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                toggleSidebar();
                e.preventDefault();
            }
        });
        
        overlay.addEventListener('click', toggleSidebar);
        
        // Close sidebar when clicking a mobile nav link
        document.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', toggleSidebar);
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
            
            // Close mobile sidebar if open
            const mobileSidebar = document.getElementById('mobileSidebar');
            const sidebarOverlay = document.getElementById('sidebarOverlay');
            
            if (mobileSidebar && mobileSidebar.classList.contains('active')) {
                mobileSidebar.classList.remove('active');
                if (sidebarOverlay) {
                    sidebarOverlay.style.display = 'none';
                }
                document.body.style.overflow = '';
            }
        }
    });
});

// Scroll reveal animations
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

function revealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal');
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
} 