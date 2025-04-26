// Projects filtering functionality
document.addEventListener('DOMContentLoaded', function() {
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
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.querySelector('.hamburger').classList.remove('active');
            }
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

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