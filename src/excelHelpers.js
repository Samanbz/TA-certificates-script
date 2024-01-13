import excelToJson from "convert-excel-to-json";

export function getSubmissions() {
	const result = excelToJson({
		sourceFile: `${process.cwd()}/data/Bewertungen.xlsx`,
		columnToKey: {
			A: "firstName",
			B: "lastName",
			C: "track",
			D: "level",
			E: "workshops",
			F: "email",
			G: "comment",
		},
	});
	return result.Tabelle1.slice(1);
}

export function prepareData(submissions) {
	for (let submission of submissions) {
		// Create full name
		submission.name = `${submission.firstName} ${submission.lastName}`;

		// Turn string of array into array of strings
		if (submission.workshops) {
			let temp = submission.workshops.slice(1, -1).replace(", ", ",");
			let workshopsArray = temp.split(",");
			if (workshopsArray[0] === "") {
				workshopsArray = [];
			}
			submission.workshops = workshopsArray;
		}

		// Turn german track into english track
		if (submission.track === "Data Science mit R") {
			submission.trackEn = "Data Science with R";
		} else if (submission.track === "Data Science mit Python") {
			submission.trackEn = "Data Science with Python";
		} else if (submission.track === "Projektmanagement") {
			submission.trackEn = "Project Management";
		} else if (submission.track === "Web Development") {
			submission.trackEn = "Web Development";
		}

		// Turn german level into english level
		if (submission.level === "Anfänger") {
			submission.levelEn = "Beginner";
		} else if (submission.level === "Fortgeschritten") {
			submission.levelEn = "Advanced";
		}

		// Create file name
		if (submission.track === "Projektmanagement") {
			submission.fileName = `${submission.trackEn} ${submission.name}`;
		} else {
			submission.fileName = `${submission.trackEn} ${submission.levelEn} ${submission.name}`;
		}
	}

	return submissions;
}
