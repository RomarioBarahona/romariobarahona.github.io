document.addEventListener('DOMContentLoaded', function() {
    var defaultUsername = 'RomarioBarahona';
    fetchRepositories(defaultUsername);
    
    document.getElementById('search-btn').addEventListener('click', function() {
        var username = document.getElementById('search-input').value;
        fetchRepositories(username);
    });
});

function fetchRepositories(username) {
    fetch('https://api.github.com/users/' + username + '/repos')
    .then(response => response.json())
    .then(data => {
        displayRepositories(data);
    })
    .catch(error => {
        console.error('Error fetching repositories:', error);
    });
}

async function fetchCommits(repoName, userName) {
    return fetch(`https://api.github.com/repos/${userName}/${repoName}/commits`)
        .then(response => response.json())
        .then(data => data.length)
        .catch(error => {
            console.error('Error fetching commits for repository:', error);
            return 0;
        });
}

async function fetchAvatar(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => data.avatar_url)
        .catch(error => {
            console.error('Error fetching avatar:', error);
            return '';
        });
}

async function displayRepositories(repositories) {
    var container = document.getElementById('projects-container');
    container.innerHTML = ''; // Clear previous results
    
    for (const repo of repositories) {
        var repoDiv = document.createElement('div');
        repoDiv.classList.add('repository');

        var repoHeader = document.createElement('div');
        repoHeader.classList.add('repo-header');

        var repoName = document.createElement('h2');
        repoName.classList.add('repo-name');
        repoName.textContent = repo.name;

        var ownerUsername = repo.owner.login;

        var avatarImg = document.createElement('img');
        avatarImg.classList.add('avatar');
        const avatarUrl = await fetchAvatar(ownerUsername);
        avatarImg.src = avatarUrl;
        avatarImg.alt = `Avatar for ${ownerUsername}`;
        avatarImg.style.width = '50px';
        avatarImg.style.height = '50px';

        repoHeader.appendChild(avatarImg);
        repoHeader.appendChild(repoName);
        
        var repoDescription = document.createElement('p');
        repoDescription.textContent = repo.description;

        var repoInfo = document.createElement('div');
        repoInfo.classList.add('repo-info');

        var creationDate = document.createElement('p');
        creationDate.innerHTML = '<i class="fas fa-calendar-alt"></i> Created: ' + new Date(repo.created_at).toDateString();

        var updateDate = document.createElement('p');
        updateDate.innerHTML = '<i class="fas fa-sync-alt"></i> Updated: ' + new Date(repo.updated_at).toDateString();

        var commits = document.createElement('p');
        const commitCount = await fetchCommits(repo.name, ownerUsername);
        commits.innerHTML = '<i class="fas fa-code-branch"></i> Commits: ' + commitCount;

        var languages = document.createElement('p');
        languages.innerHTML = '<i class="fas fa-code"></i> Languages: ' + (repo.language || 'N/A');

        var watchers = document.createElement('p');
        watchers.innerHTML = '<i class="fas fa-eye"></i> Watchers: ' + repo.watchers;

        var repoLink = document.createElement('a');
        repoLink.href = repo.html_url;
        repoLink.textContent = 'View on GitHub';

        repoInfo.appendChild(creationDate);
        repoInfo.appendChild(updateDate);
        repoInfo.appendChild(commits);
        repoInfo.appendChild(languages);
        repoInfo.appendChild(watchers);

        repoDiv.appendChild(repoHeader);
        repoDiv.appendChild(repoDescription);
        repoDiv.appendChild(repoInfo);
        repoDiv.appendChild(repoLink);

        container.appendChild(repoDiv);
    }
}
