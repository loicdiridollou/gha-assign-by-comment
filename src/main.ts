import * as core from "@actions/core";
import fs from "fs";

export async function run(): Promise<void> {
  try {
    const GITHUB_EVENT_PATH = process.env.GITHUB_EVENT_PATH;
    let eventFile = JSON.parse(fs.readFileSync(GITHUB_EVENT_PATH!, "utf-8"));

    let currentAssignees = getAssignees(eventFile.comment.issue_url);
    console.log(currentAssignees);
    console.log(eventFile.comment.body);
    console.log(eventFile.comment.user.login);

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
