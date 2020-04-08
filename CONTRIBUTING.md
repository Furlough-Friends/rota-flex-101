# Contributing to Rota-Flex-101 Project

In order to help everyone achieve cleanliness and clarity, we have some guidelines for contributing. Guidelines in this file are general, those specific to the UI can be found in the client folder contributing doc.

## <a name="git-hygiene"></a> Git Hygiene

We are currently using GitHub Flow, which has a sacrosanct master and feature branches for merging
directly into master. We reserve the right to switch to Git Flow in future, for its better release
management and hotfix strategies.

### Branch naming

All branch names should include a GitHub project issue number.

- Feature branches should be named `feature/6-brief-feature-description`
- Bugfix branches should be named `bugfix/5-brief-bug-description`
- Testing branches (automated tests, etc) should be named `test/7-brief-code-description`

Note that where possible (i.e. when caught in testing), bugs should be fixed in the same issue
as the main feature.

### Force-pushing

- Force-pushing is permitted on feature branches that you are working on alone.
- If you are working on the same feature branch as other developers, you are strongly advised not to
  force-push unless absolutely necessary, and you must co-ordinate with them to avoid problems.
- Always use force-with-lease when pushing, i.e. `git push --force-with-lease`.

### Pull requests

- PRs should be kept small and focused; your fellow developers will not thank you for a monster PR
  with dozens of changed files! It is fine to use a series of PRs for merging in a feature, as long
  as you don't break functionality in the main branch (develop or master).
- Assign yourself to your PRs and select other appropriate team members as reviewers, so that
  responsibilities are clear.
- When you are added as reviewer to a PR, please submit a review in good time, and re-review after
  any changes suggested. If you cannot, then let the PR opener know so that they may ask someone
  else.
- Always squash-and-merge unless you have good reason not to.
- Always delete branches after merging.