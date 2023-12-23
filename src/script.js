import { config } from "dotenv";
import {
	readTemplateFile,
	fillTemplate,
	generateCertificate,
} from "./wordHelpers.js";
import { getSubmissions, prepareData } from "./excelHelpers.js";
import { createTransporter, sendMail } from "./mailHelpers.js";

async function main() {
	config();
	let submissions = getSubmissions();
	let cleanSubmissions = prepareData(submissions);
	let transporter = createTransporter();

	for (let submission of cleanSubmissions) {
		const template = readTemplateFile(submission.track, submission.level);
		const filledTemplate = await fillTemplate(template, submission);
		await generateCertificate(filledTemplate, submission.fileName);
		sendMail(transporter, submission);
	}
}

main();
