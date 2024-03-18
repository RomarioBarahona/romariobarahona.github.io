document.addEventListener('DOMContentLoaded', function () {
    fetch(`https://api.github.com/users/RomarioBarahona/repos`)
    .then(response => response.json())
    .then(data => {
        const projectsContainer = document.getElementById("projects-container");
        data.forEach(project => {
            const projectElement = document.createElement("div");
            projectElement.classList.add("project");

            const creationDate = new Date(project.created_at).toDateString();
            const updateDate = new Date(project.updated_at).toDateString();

            fetch(project.languages_url)
            .then(response => response.json())
            .then(languages => {
                const languageList = Object.keys(languages).join(', ');

                projectElement.innerHTML = `
                    <h3>${project.name}</h3>
                    <p>Description: ${project.description || 'No description available'}</p>
                    <p>Creation Date: ${creationDate}</p>
                    <p>Last Updated: ${updateDate}</p>
                    <p>Languages: ${languageList}</p>
                    <p>Watchers: ${project.watchers_count}</p>
                    <a href="${project.html_url}" target="_blank">View Project</a>
                `;
                projectsContainer.appendChild(projectElement);
            })
            .catch(error => console.error("Error fetching languages:", error));
        });
    })
    .catch(error => console.error("Error fetching GitHub projects:", error));
});
