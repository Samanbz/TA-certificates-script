import {
	readTemplateFile,
	fillTemplate,
	generateCertificate,
} from "./wordHelpers.js";
import { getSubmissions, prepareData } from "./excelHelpers.js";
import { initProgressBar } from "./progressBar.js";

async function main() {
	const submissions = getSubmissions();
	const cleanSubmissions = prepareData(submissions);
	const progressBar = initProgressBar(cleanSubmissions.length);
	let error = null;

	for (let submission of cleanSubmissions) {
		try {
			const template = readTemplateFile(
				submission.track,
				submission.level
			);
			progressBar.increment(0.25);

			const filledTemplate = await fillTemplate(template, submission);
			progressBar.increment(0.25);

			await generateCertificate(filledTemplate, submission.fileName);
			progressBar.increment(0.5);
		} catch (error) {
			error = true;
			return `Error generating certificate for ${submission}: ${error}`;
		}
	}

	if (!error) {
		progressBar.stop();
		console.log("Done! Check the output folder for your certificates.");
	}
}

main();
