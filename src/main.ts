import * as core from "@actions/core";
import { wait } from "./wait";
import fs from "fs";

export async function run(): Promise<void> {
  try {
    const ms: string = core.getInput("milliseconds");

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Waiting ${ms} milliseconds ...`);

    // Log the current timestamp, wait, then log the new timestamp
    core.debug(new Date().toTimeString());
    const GITHUB_EVENT_PATH = process.env.GITHUB_EVENT_PATH;
    console.log(JSON.parse(fs.readFileSync(GITHUB_EVENT_PATH!, "utf-8")));

    await wait(parseInt(ms, 10));
    core.debug(new Date().toTimeString());

    // Set outputs for other workflow steps to use
    core.setOutput("time", new Date().toTimeString());
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
  }
}
