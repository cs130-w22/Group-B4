# Flannel
Flannel is a web application created using the MERN stack. We wanted to give UCLA students a way to connect with each other based on common interests and this is the main motivation behind Flannel. Whether you want to find people to study for a class final with or go to the gym with, Flannel presents an easy way to search and reach out to people who share these interests! It's as simple as creating an account in which you be shown UCLA students who are in the same classses or have the same interests and affiliations as you. Futhermore, you can search for students based on this criteria with the hope that you will able to connect with the UCLA community in an easy way.  

# Repository Template

[![Build Status](https://travis-ci.org/cs130-w21/template.svg?branch=master)](https://travis-ci.org/cs130-w21/template)
[![Release](https://img.shields.io/github/v/release/cs130-w21/template?label=release)](https://github.com/cs130-w21/template/releases/latest)

This repo serves as a template for repositories in this organization. The following information describes how the native features/workflows of Github can be customized to work in a scrum development process.

## Issues

An issue is a unit of tracking work. Issues can be classified into different classes using [labels](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels). This can be used to classify issues in the scrum process as follows.

### Epic

An [epic](https://dev.to/jorenrui/a-look-into-how-i-manage-my-personal-projects-my-git-github-workflow-1e7h#epic-issue) is an issue with the label `epic`. It represents a large story that can be broken into stories, which can be addressed over multiple sprints. An epic issue references its story issues as a list in its description. A Github action has been added to automatically check/uncheck the story list items when they get closed/reopened.

### Story

A [story](https://www.atlassian.com/agile/project-management/epics-stories-themes) is an issue with the label `story`. It may represents a new feature, or an enhancement to an existing feature. A story issue can be broken into sub tasks, which are added as a list in the description of the story issue. These sub task items can be checked manually by the developer to indicate completion.

### Bug

A bug is an issue with the label `bug`. It represents a problem with the existing code that needs to be fixed.

### Question

A question is an issue with the label `question`. It represents a question raised by any one and that may get converted into other types of issues.

## Labels

In addition to the [standard labels](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/managing-labels#about-default-labels) above, you can add new labels to issues to classify them into different classes like `documentation`, `frontend`, etc, or to add metadata like `duplicate`, `invalid` etc.

## Milestones

A [milestone](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/tracking-the-progress-of-your-work-with-milestones) groups issues that are expected to be delivered at some point in time. It also allows ordering (prioritizing) theses issues and tracking their progress (percentage of issues completed so far). In the scrum context, a milestone can be used as a sprint. So, you can create your sprints and give them names like Sprint1, Sprint2, etc. and set their due dates respectively.

## Projects

A [project](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/tracking-the-progress-of-your-work-with-project-boards) is a kanban-style board that can aggregate a set of issues for any purpose. In the scrum context, we can create one project called `Scrum Board` and choose its template to be `Automated kanban with reviews`. (This will create a set of initial notes that you can delete).

## Branches

The `master` branch (sometimes called the `main` branch) is the main branch used for releases. Other branches can be created too. For example, a branch called `gh-pages` is often used as a website for the repository (for more information check this [link](https://pages.github.com/)). Other branches can be created to address the issues of the repository, one branch per issue (called an `issue` branch). Such branches can then be used to create pull requests, where they get peer reviewed and eventually merged into the `master` branch. For more information on branches, check this [link](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-branches).

## Pull Requests

A [pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests) is a request to merge commits from one branch to another. This is typically used to merge commits from an `issue` branch into the `master` branch. A pull request is how the process of peer review is carried. Reviewers can comment on the code changes to show approval or request changes (which will need to be addressed by additional commits to the `issue` branch). When a CI/CD pipeline is configured for a repository (see below), it will run on any `issue` branch that is part of a pull request. When the peer review process has concluded, the new commits can merged into the `master` branch. The recommended merge option to choose is `Squash and merge`, (i.e., squash all commits into a single commit), since it makes the repository's history simpler.

## Tags

Tags can be used to mark release points in a repository's commit history. Typically, after some work goal has been achieved, with a set of commits, a tag (typically a version number like 1.0.0, 1.0.1, etc.) is [pushed to the respository](https://stackoverflow.com/questions/18216991/create-a-tag-in-a-github-repository) to mark this point. This results in the tag showing up in the repository's [tags page](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/viewing-your-repositorys-releases-and-tags).

## Workflows

### Creating issues

An issue can be created from the `issues` tab of a repository. An issue type (bug, story, epic, question) is first chosen then its corresponding template can be sufficiently filled.

### Triaging issues

The Product Owner goes frequently to the `Scrum Board` project and clicks on the `Add Cards` link to triage new issues in the repository to the board's `To do` column, which acts here as the `Product Backlog`. Product Owner can also add unbaked ideas to the `To do` column as notes, which are placeholders that can later be converted into issues (right click to do that). Issues and notes can then be ordered in the `To do` column to show their priorities.

### Planning sprints

The Scrum Master creates a new milestone and gives it a suitable name (e.g., Sprint1) and a due date. Then, in the `Scrum Board`, issues from the top of the `To do` column (assuming they have been ordered based on priority) can be assigned to that milestone and to the developers who will work on them.

### Working on issues

Developers go to the `Scrum Board` where they can filter it for the issues assigned to them in a given milestone. They can pick ones to work on by moving them to the `In progress` column (this is important since this is not automated).

### Reviewing progress

In the daily standup, the `Scrum Master` can review progress by going to the `Scrum Board` and filtering it by the current milestone (sprint). Developers can then reference issues in the various columns when they answer the usual standup questions, e.g., issues they work on (`In progress`), finsihed (`Done`) or yet to work on (`To do`).

### Working with issue branches

Before developers can work on an issue, they should checkout and pull the `master` branch to ensure that they have all the latest commits locally. Then, they should create a new local `issue` branch and name it `issue-[number]` (replacing `[number]` by the issue number). Several `issue` branches can be created concurrently, one for each issue, but it is important to make them independent from each other by checking out the `master` branch before creating each of them. This allows them to be pushed and merged independently from each other (and with the least conflicts).

Each `issue` branch can accumulate commits to address the issue. When ready, it can then be pushed to a corresponding remote branch that can then be used to create a pull request into the `master` branch. The pull request template needs to be filled at this point. Once created, a pull request can be reviewed by a peer reviewer who may request changes. These changes can be made using new commits in the local `issue` branch that can subsequently be pushed to the corresponding remote `issue` branch. When all peer reviews have concluded, the pull request can then be `squash merged` into the `master` branch ([read more here](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-request-merges#squash-and-merge-your-pull-request-commits)), and the `issue` branch [can be deleted](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/managing-the-automatic-deletion-of-branches). If the pull request description includes the words `fixes #[number]` (where `[number]` is an issue number), the issue with that number will [automatically be closed](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword).

> it is recommeded to not push commits to the master branch directly but to always go through a peer review process using an `issue` branch.

### Creating releases

It is recommended to [create periodic releases](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/managing-releases-in-a-repository#creating-a-release) from a repository, at least at the end of each sprint but can be more frequent. These releases should be working versions of the component(s) being developed in the repository. To create such releases, a new tag representing a version number (e.g., 1.0.0) is added to the local `master` branch then pushed to the remote `master` branch. A new release can then be created in Github using this tag.

### Using a CI/CD pipeline

CI Pipeline Script
https://github.com/cs130-w22/Group-B4/blob/main/.travis.yml


Travis CI triggers every time a user commits and pushes to GitHub. Once Travis CI is triggered, the following scripts are run:

`before_install` is first evoked to remove the node_modules and package_lock.json file.

`before_script` changes into the flannel directory due to the unconventional hierarchy of our project being within the Group-B4 folder, and installs the react-scripts node module.

`script` runs npm test to execute our Jest driven test suite. Morever, we run npm run build in order to compile the app for production to the `build` folder and ensure that our build does not fail.
