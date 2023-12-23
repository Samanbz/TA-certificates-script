import cliProgress from "cli-progress";

export function initProgressBar(barlength) {
	const progressBar = new cliProgress.SingleBar(
		{
			hideCursor: true,
			format: "{bar} | {percentage}%",
		},
		cliProgress.Presets.shades_classic
	);

	progressBar.start(barlength, 0);
	return progressBar;
}
