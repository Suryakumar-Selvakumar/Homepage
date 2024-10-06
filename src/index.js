import "./style.css";
import externalLinkIcon from "./icons/open-in-new.svg";
import gitHubIcon from "./icons/github.svg";

const projectDemoLinkImg = document.querySelectorAll("#demo");
for (const item of projectDemoLinkImg) {
  item.src = externalLinkIcon;
}

const projectGitHubImg = document.querySelectorAll("#github");
for (const item of projectGitHubImg) {
  item.src = gitHubIcon;
}
