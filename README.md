# GitHub Action to assign a reviewer by comment command.

- This is a [GitHub Actions](https://help.github.com/en/articles/about-github-actions).
- This is designed to allow selecting an assignee through a comment.

## Motivation

- We don't manage any bot instance for this purpose.
- We don't want to make it very complicated and avoid having to go back to the
  top to select the assignee, it is much easier once at the bottom of the
  conversation to comment out to select an assignee instead of having to go
  back to the top and select an assignee in the drop down menu.

## Special Command List

This action is based on a couple of commands to operate:

- `\take`
- `\assign`
- `\unassign`

The last two are designed to take usernames as arguments (separated by a space)
whereas `\take` will automatically identify the username to select as assignee.

### `\take`

- This identifies the user that wrote the comment and change the assignee
  field (_assignees_) to include the user in question.

### `\assign @username1 @username2`

- This assigns `@username1` and `@username2` to _assignees_ filed.

### `\unassign username1 username2`

- This removes `@username1` and `@username2` from the _assignees_ filed.

## Setup

Add this example to your GitHub Actions [workflow configuration](https://help.github.com/en/articles/configuring-workflows).

### YAML syntax

```yaml
name: Select assignee by comment
on: [issue_comment, pull_request_review]

jobs:
  assign_review_by_comment:
    runs-on: ubuntu-latest
    steps:
      - name: Select assignee by comment
        # We recommend to use latest version
        # otherwise you can point to a branch or the commit sha
        uses: loicdiridollou@gha-assign-by-comment@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Limitations & Known Problems

- This action takes in general up to 10 seconds to run the action. Furthermore,
  the runner can be clogged meaning that the action will be queued and won't
  run until a runner is available.
