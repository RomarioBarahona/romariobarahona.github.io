document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
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
            <p>${project.description}</p>
            <a href="${project.html_url}" target="_blank">View Project</a>
        `;
        projectsContainer.appendChild(projectElement);
    });
})
.catch(error => console.error("Error fetching GitHub projects:", error));