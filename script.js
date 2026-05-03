let goToTopBtn = document.getElementById("go-to-top");
const btnSendEmail = document.getElementById('sendEmail');
const btnWhatsapp = document.getElementById('submitBtnWhatsapp');
const sendMessageBtn = document.getElementById('sendMessageBtn');

window.onscroll = function () {
    if (window.scrollY >= 400) {
        goToTopBtn.style.display = "block";
    }
    else {
        goToTopBtn.style.display = "none";
    }
}

goToTopBtn.onclick = function () {
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth',
    })
}
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer dynamically
    const yearElement = document.getElementById('year'); /* Get year element */
    const currentYear = new Date().getFullYear(); /* Get current year */
    if (yearElement) {
        yearElement.textContent = currentYear; /* Set year text content */
    }

    const hamburger = document.getElementById('hamburger');
    const navBar = document.querySelector('.nav-bar');
    const navLinks = document.querySelectorAll('.nav-bar a');

    if (hamburger && navBar) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navBar.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navBar.classList.remove('active');
            });
        });
    }
});



// envouyer un message
function EnvoyerEmail() {

    const to = "abdessamiaibbaali4@gmail.com";
    const subject = encodeURIComponent("Meassage from Portfolio Contact Form");
    const body = encodeURIComponent(
        "bonjour ,j'ai vu votre portfolio et je suis intéressé par vos compétences en développement web. "
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${to}&su=${subject}&body=${body}`;


    btnSendEmail.disabled = true;

    setTimeout(() => {
        window.open(gmailUrl, '_blank');
        btnSendEmail.disabled = false;

    }, 2000);
}


function EnvoyerWhatsapp() {
    const phone = "212771574705";
    const message = encodeURIComponent(
        "Bonjour, j'ai vu votre portfolio et je suis intéressé par vos compétences en développement web."
    );

    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    btnWhatsapp.disabled = true;

    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        btnWhatsapp.disabled = false;
    }, 1000);
}

btnSendEmail.addEventListener('click', EnvoyerEmail);
btnWhatsapp.addEventListener('click', EnvoyerWhatsapp);


window.addEventListener('onload', () => {
    const homeLink = document.getElementById("home-link");
    homeLink.classList.add("active");
});

// Add click event listeners to all navigation links
const navLinks = document.querySelectorAll('.nav-bar a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// add scroll event listener to update active link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let currentSectionId = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 50) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
});




// nodemailer code for sending email from contact form
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm'); // Get the contact form
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            try {
                const response = await fetch("/api/send_email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, message })
                });
                
                const responseText = await response.text();
                console.log("Response status:", response.status);
                console.log("Response text:", responseText);
                
                let data;
                try {
                    data = JSON.parse(responseText);
                } catch (e) {
                    console.error("Failed to parse JSON:", e);
                    alert("Server error: " + responseText);
                    return;
                }
                
                if (response.ok) {
                    alert("Message sent successfully!");
                    contactForm.reset();
                } else {
                    alert("Error: " + (data.message || data.error || "Unknown error"));
                }
            } catch (error) {
                console.error("Fetch error:", error);
                alert("Error sending message: " + error.message);
            }
        });
    }
});
