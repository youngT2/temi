document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('visible');
        menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('visible'));
    });

    function updateClock() {
        const now = new Date();
        const options = {
            timeZone: 'Africa/Lagos',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const timeString = now.toLocaleString('en-GB', options);
        document.getElementById('liveTime').textContent = timeString;
        
        const statusElement = document.getElementById('businessStatus');
        const messageElement = document.getElementById('statusMessage');

        const hours = now.toLocaleString('en-GB', { hour: '2-digit', hour12: false, timeZone: 'Africa/Lagos' }).slice(0, 2);

        const isOfficeHours = hours >= 9 && hours < 17;

        statusElement.textContent = isOfficeHours ? 'Open for Business' : 'Closed';
        messageElement.innerHTML = isOfficeHours ? 'Services are now available. Check our <a href="services.html">services</a>.' : 'Our offices are currently closed, please request a callback and we will get back to you soon <a href="contact-us.html">contact us</a>. ';
    }

    setInterval(updateClock, 1000);
    updateClock(); // initial call to display the time immediately


    setInterval(updateClock, 1000);

    document.getElementById('testimonialForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Name validation
        if (name.length < 2 || name.length > 50) {
            alert('Name must be between 2 and 50 characters.');
            return;
        }
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            alert('Name can only contain letters and spaces.');
            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Message validation (already implemented)
        if (message.length <= 10) {
            alert('Testimonial is too short!');
            return;
        }
        if (message.length > 500) {
            alert('Testimonial is too long!');
            return;
        }

        // Proceed with form submission
        fetch('http://localhost:3001/testimonials', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, email, message })
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            const container = document.getElementById('testimonialsContainer');
            const newTestimonial = document.createElement('div');
            newTestimonial.className = 'testimonial';
            newTestimonial.innerHTML = `<p class="testimonial-text">"${message}"</p><p class="client-name client-name-highlight">– ${name}</p>`;
            container.appendChild(newTestimonial);
            alert(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to submit testimonial.');
        });

        // Clear form fields after submission
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    });
});
