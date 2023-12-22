import * as core from "@actions/core";
import fs from "fs";

export async function run(): Promise<void> {
  try {
    const GITHUB_EVENT_PATH = process.env.GITHUB_EVENT_PATH;
    let eventFile = JSON.parse(fs.readFileSync(GITHUB_EVENT_PATH!, "utf-8"));

    console.log(eventFile.comment.issue_url);
    console.log(eventFile.comment.body);
    console.log(eventFile.user.login);

    // Set outputs for other workflow steps to use
    core.setOutput("time", new Date().toTimeString());
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
  }
}
