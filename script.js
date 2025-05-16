// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        // Check if the element is at least partially in the viewport
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0 &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.right >= 0
        );
    }

    function handleScrollReveal() {
        revealElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('active');
            }
            // Optional: Remove 'active' class when out of view if you want repeated animation
            // else {
            //     el.classList.remove('active');
            // }
        });
    }

    // Add scroll event listener and run on load
    window.addEventListener('scroll', handleScrollReveal);
    handleScrollReveal(); // Trigger on page load

    // --- Portfolio Modal Interaction ---
    const modal = document.getElementById('portfolio-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeButton = document.querySelector('.close-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Function to open the modal
    function openModal(item) {
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');
        const imageUrl = item.getAttribute('data-image');

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImage.src = imageUrl; // Set the image source

        modal.style.display = 'block'; // Show the modal
        document.body.style.overflow = 'hidden'; // Prevent scrolling the body
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none'; // Hide the modal
        document.body.style.overflow = ''; // Restore body scrolling
    }

    // Add click event listeners to portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            openModal(item);
        });
    });

    // Add click event listener to the close button
    closeButton.addEventListener('click', closeModal);

    // Close the modal if the user clicks outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

     // Close the modal if the user presses the Escape key
     document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
     });

});
