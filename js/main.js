let input = document.getElementById("repoName");
let findBtn = document.querySelector(".repos-container .find");
let result = document.querySelector(".repos-container .result");

console.log("help");

findBtn.onclick = function () {
  let userName = input.value;
  findRepos(userName);
};

function findRepos(userName) {
  if (userName && userName.trim()) {
    // check if the username is not empty or white space
    fetch(`https://api.github.com/users/${userName}/repos`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length) {
          // check if there is data returned
          createRepos(data);
        } else {
          result.innerHTML =
            "Sorry, didn't find a user with this name or this user doesn't have any repos";
        }
      });
  } else {
    result.innerHTML = "The input can't be empty or white space";
  }
}

// function that creates each repo and add it to the DOM
function createRepos(repos) {
  let fragment = new DocumentFragment();
  repos.forEach((repo) => {
    let mainDiv = document.createElement("div");
    mainDiv.className = "repo-div";
    let repoName = document.createElement("span");
    repoName.className = "name";
    repoName.appendChild(document.createTextNode(repo.name));
    mainDiv.appendChild(repoName);
    let stars = document.createElement("span");
    stars.className = "stars";
    stars.appendChild(
      document.createTextNode(`${repo.stargazers_count} Stars`)
    );
    mainDiv.appendChild(stars);
    let watchers = document.createElement("span");
    watchers.className = "watchers";
    watchers.appendChild(
      document.createTextNode(`${repo.watchers_count} Watchers`)
    );
    mainDiv.appendChild(watchers);
    let link = document.createElement("a");
    link.className = "link";
    link.setAttribute("target", "_blank");
    link.href = repo.svn_url;
    link.appendChild(document.createTextNode("Visit"));
    mainDiv.appendChild(link);
    fragment.appendChild(mainDiv);
  });
  result.innerHTML = "";
  result.appendChild(fragment);
}
