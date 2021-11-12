// div for profile information
const overview = document.querySelector(".overview");
const username = "PTroyP";
const repoList = document.querySelector(".repo-list");
const reposInfo = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

// retrieve user info from github
const profileInfo = async function() {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
    userDisplay(data);
}
profileInfo();

// function to display user information 
const userDisplay = function(data) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    // add html elements to userInfo div
    userInfo.innerHTML = `<figure>
        <img alt="user avatar" src =${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>`;
        // append new elements to userInfo div
    overview.append(userInfo);
    grabRepos();
}

const grabRepos = async function() {
    const resRepo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const dataRepo = await resRepo.json();
    console.log(dataRepo);
    individualRepo(dataRepo);
}
// grabRepos();

const individualRepo = function(repos) {
    // creating list items in the ul that display the repos
    for(let entry of repos){
        const listItem = document.createElement("li");
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>${entry.name}</h3>`;
        repoList.append(listItem);
}}

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        console.log(repoName);
        specificRepoInfo(repoName);
    }    
});

const specificRepoInfo = async function (repoName) {
    const resSpecific = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await resSpecific.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
        for(let key in languageData) {
            languages.push(key);
            console.log(languages);
        }
    // console.log(languages);
    displaySpecRepoInfo(repoInfo, languages);

}

const displaySpecRepoInfo = function(repoInfo, languages) {
    repoData.innerHTML = "";
    const indyRepo = document.createElement("div");
    indyRepo.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class = "visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on Github!</a>
            `
    repoData.append(indyRepo);
    repoData.classList.remove("hide");
    reposInfo.classList.add("hide");
}