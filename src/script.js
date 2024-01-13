import {
	readTemplateFile,
	fillTemplate,
	generateCertificate,
	generateCommentFile,
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
			progressBar.increment(0.2);

			const filledTemplate = await fillTemplate(template, submission);
			progressBar.increment(0.2);

			await generateCertificate(filledTemplate, submission.fileName);
			progressBar.increment(0.3);

			await generateCommentFile(submission);
			progressBar.increment(0.3);
		} catch (err) {
			error = true;
			console.log(
				`Error generating certificate for ${submission.name}: ${err.message}`
			);
			throw err;
		}
	}

	if (!error) {
		progressBar.stop();
		console.log("Done! Check the output folder for your certificates.");
	}
}

main();
