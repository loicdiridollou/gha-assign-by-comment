"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core = __importStar(require("@actions/core"));
const fs_1 = __importDefault(require("fs"));
async function run() {
    try {
        const GITHUB_EVENT_PATH = process.env.GITHUB_EVENT_PATH;
        let eventFile = JSON.parse(fs_1.default.readFileSync(GITHUB_EVENT_PATH, "utf-8"));
        let currentAssignees = getAssignees(eventFile.comment.issue_url);
        console.log(currentAssignees);
        console.log(eventFile.comment.body);
        console.log(eventFile.comment.user.login);
        // Set outputs for other workflow steps to use
        core.setOutput("time", new Date().toTimeString());
    }
    catch (error) {
        // Fail the workflow run if an error occurs
        if (error instanceof Error)
            core.setFailed(error.message);
    }
}
exports.run = run;
async function getAssignees(issueUrl) {
    let actualResp;
    const actual = await fetch(issueUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
    });
    actualResp = await actual.json();
    console.log(actualResp);
    let currentAssignees = [];
    for (let el of actualResp.assignees) {
        currentAssignees.push(el.login);
    }
    return currentAssignees;
}
//# sourceMappingURL=main.js.map