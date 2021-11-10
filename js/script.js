// div for profile information
const overview = document.querySelector(".overview");
const username = "PTroyP";
const reposList = document.querySelector(".repo-list");

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
        reposList.append(listItem);
}}