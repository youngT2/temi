document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('visible');
        menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('visible'));
    });

    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('liveTime').textContent = formattedTime;
        const statusElement = document.getElementById('businessStatus');
        const messageElement = document.getElementById('statusMessage');
        const isOfficeHours = hours >= 9 && hours < 17;

        statusElement.textContent = isOfficeHours ? 'Open for Business' : 'Closed';
        messageElement.innerHTML = isOfficeHours ? 'Services are now available. Check our <a href="services.html">services</a>.' : 'Our offices are currently closed, please request a callback and we will get back to you.';
        function hoverEffect(element) {
            element.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
        }
        
        function resetEffect(element) {
            element.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        }
        
    }

    setInterval(updateClock, 1000);

    document.getElementById('commentForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
        var comment = document.getElementById('userComment').value; 

        fetch('api/comments', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({comment: comment})
        })
        .then(response => response.json())
        .then(data => {
            alert('Thank you for your comment!');
            document.getElementById('userComment').value = '';
        })
        .catch(error => {
            console.error('Error posting comment:', error);
            alert('Your comment could not be posted.');
        });
    });
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Thank you for your message. We will get back to you shortly!');
        // Add functionality to send form data to server here
    });
    document.getElementById('testimonialForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var message = document.getElementById('message').value;
    
        var container = document.getElementById('testimonialsContainer');
        var newTestimonial = document.createElement('div');
        newTestimonial.className = 'testimonial';
        newTestimonial.innerHTML = `<p>"${message}"</p><h4>- ${name}</h4>`;
        container.appendChild(newTestimonial);
    
        // Clear form fields after submission
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    });
     

    
});
