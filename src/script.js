import {
	readTemplateFile,
	fillTemplate,
	generateCertificate,
} from "./wordHelpers.js";
import { getSubmissions, prepareData } from "./excelHelpers.js";

async function main() {
	let submissions = getSubmissions();
	let cleanSubmissions = prepareData(submissions);
	for (let submission of cleanSubmissions) {
		const template = readTemplateFile(submission.track, submission.level);
		const filledTemplate = await fillTemplate(template, submission);
		await generateCertificate(filledTemplate, submission.fileName);
	}
}

main();
