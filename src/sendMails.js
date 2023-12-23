import { config } from "dotenv";
import prompt from "prompt";
import { getSubmissions, prepareData } from "./excelHelpers.js";
import { createTransporter, sendMail } from "./mailHelpers.js";
import { initProgressBar } from "./progressBar.js";

async function main() {
	config();
	const { sendMails } = await prompt.get([
		{
			name: "sendMails",
			description: "Are you sure you want to send mails? (true/false)",
			type: "boolean",
			default: false,
			required: true,
		},
	]);

	if (!sendMails) {
		console.log("No mails will be sent.");
		return;
	}

	const submissions = getSubmissions();
	const cleanSubmissions = prepareData(submissions);
	const transporter = createTransporter();
	const progressBar = initProgressBar(cleanSubmissions.length);
	let error = null;

	for (let submission of cleanSubmissions) {
		try {
			await sendMail(transporter, submission);
			progressBar.increment();
		} catch (error) {
			error = true;
			return `Error sending mail to ${submission}: ${error.message}`;
		}
	}

	if (!error) {
		progressBar.stop();
		console.log("Done! All mails have been sent.");
	}
}

main();
