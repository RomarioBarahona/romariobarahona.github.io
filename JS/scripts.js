document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    fetch("https://api.github.com/users/RomarioBarahona/repos")
    .then(response => response.json())
    .then(data => {
        const projectsContainer = document.getElementById("projects-container");
        data.forEach(project => {
            const projectElement = document.createElement("div");
            projectElement.classList.add("project");
            projectElement.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description || 'No description available'}</p>
                <a href="${project.html_url}" target="_blank">View Project</a>
            `;
            projectsContainer.appendChild(projectElement);
        });
    })
    .catch(error => console.error("Error fetching GitHub projects:", error));
});
