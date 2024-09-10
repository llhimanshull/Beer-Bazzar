document.addEventListener("DOMContentLoaded", () => {

    const popup = () => {
        const ageVerification = document.getElementById("age-verification");    
        const text = document.getElementById("text");
        const registration = document.getElementById("visitor");
        const content = document.getElementById("main");
        const navbar = document.getElementById("navbar");

        // Helper function to check if a cookie exists
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        // Check if user is already verified
        if (getCookie('verified') === 'true') {
            content.style.display = "block";
            ageVerification.style.display = "none";
            registration.style.display = "none";
            navbar.style.pointerEvents = "all";
            return;
        }

        // Show age verification pop-up
        ageVerification.style.display = "none";

        setTimeout(() => {
            ageVerification.style.display = "flex";
            content.style.filter = 'blur(7px)';
            navbar.style.filter ='blur(7px)';
        }, 10000);

        document.getElementById("yes-btn").addEventListener("click", () => {
            ageVerification.style.display = "none";
            registration.style.display = "flex";
        });

        document.getElementById("no-btn").addEventListener("click", () => {
            ageVerification.style.display = "flex";
            text.textContent = "You must be 18 years old or older to access this site.";
        });

        document.getElementById("visitor-form").addEventListener("submit", async (event) => {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const number = document.getElementById("number").value;
            try {
                const response = await fetch("/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, number })
                });

                if (response.ok) {
                    // Set a cookie to indicate the user is verified
                    document.cookie = "verified=true; max-age=31536000; path=/";
                    registration.style.display = "none";
                    content.style.display = "block";
                    content.style.filter = 'none';
                    navbar.style.filter ='none';
                    navbar.style.pointerEvents='all';
                } else {
                    alert("Failed to register. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Failed to register. Please try again.");
            }
        });
    }

    const slider = () => {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.beer-slide');
        const totalSlides = slides.length;
        
        const showSlide = (index) => {
            slides.forEach((slide, idx) => {
            slide.classList.remove('active');
            if (idx === index) {
                slide.classList.add('active');
            }
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        };

        document.getElementById('next').addEventListener('click', nextSlide);
        document.getElementById('prev').addEventListener('click', prevSlide);

        setInterval(nextSlide, 10000); // Change slide every 3 seconds

        showSlide(currentSlide);
    }   

    const loco = () =>{
        const scrollContainer = document.querySelector('[data-scroll-container]');
            
            if (scrollContainer) {
                const scroll = new LocomotiveScroll({
                    el: scrollContainer,
                    smooth: true
                });
                console.log('Locomotive Scroll initialized');
            } else {
                console.error('Element with data-scroll-container not found.');
            }
    }

    

    loco();
    popup();
    slider();

});
