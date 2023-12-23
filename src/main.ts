import * as core from "@actions/core";
import fs from "fs";

export async function run(): Promise<void> {
  try {
    const GITHUB_EVENT_PATH = process.env.GITHUB_EVENT_PATH;
    let eventFile = JSON.parse(fs.readFileSync(GITHUB_EVENT_PATH!, "utf-8"));

    let body: string = eventFile.comment.body;
    let newAssignees: string[] = [];
    let currentAssignees = await getAssignees(eventFile.comment.issue_url);
    if (body.startsWith("/take")) {
      let user = eventFile.comment.user.login;
      if (currentAssignees.includes(user)) {
        newAssignees.push(user.replace("@", ""));
      }
    } else if (body.startsWith("/assign")) {
      for (let user of body.split(" ").slice(1)) {
        if (currentAssignees.includes(user)) {
          newAssignees.push(user.replace("@", ""));
        }
      }
    } else if (body.startsWith("/unassign")) {
      for (let user of body.split(" ").slice(1)) {
        currentAssignees.splice(
          currentAssignees.indexOf(user.replace("@", "")),
        );
      }
      newAssignees = currentAssignees;
    }

    if (newAssignees) {
      console.log(newAssignees);
    }

    // Set outputs for other workflow steps to use
    core.setOutput("time", new Date().toTimeString());
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
  }
}

async function getAssignees(issueUrl: string): Promise<string[]> {
  let actualResp;
  const actual = await fetch(issueUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });
  actualResp = await actual.json();
  console.log(actualResp);
  let currentAssignees: string[] = [];
  for (let el of actualResp.assignees) {
    currentAssignees.push(el.login);
  }

  return currentAssignees;
}
