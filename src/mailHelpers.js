import nodemailer from "nodemailer";

export function createTransporter() {
	return nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.SENDER_EMAIL,
			pass: process.env.APP_PASSWORD,
		},
	});
}

export function sendMail(transporter, submission) {
	let mailOptions = {
		from: process.env.SENDER_EMAIL,
		to: submission.email,
		subject: "Dein TechAcademy-Zertifikat",
		html: `
			<p>Lieber ${submission.firstName},</p>
			<p>
				Vielen Dank für Deine engagierte Teilnahme bei TechAcademy im
				letzten Semester und herzlichen Glückwunsch zur erfolgreichen
				Abgabe! Anbei findest Du Dein Zertifikat und ein Kommentar
				deines Mentors.
			</p>

			<p>
				Ab sofort gehörst Du zu unserer Alumni-Community! Das bedeutet:
				auf Dich warten exklusive Workshops und coole Social Events zu
				denen alle AbsolventInnen unseres Programms eingeladen sind.
				Schon Ende Juni wird sich eine tolle Gelegenheit ergeben, sich
				mit anderen Alumni auszutauschen und neue Kontakte zu knüpfen,
				wir melden uns zeitnah mit genaueren Infos.
			</p>

			<p>
				Außerdem bist Du herzlichst eingeladen, Dich für ein weiteres
				Semester bei uns zu bewerben. Wenn Du Dir außerdem vorstellen
				kannst, hinter den Kulissen von TechAcademy mitzuwirken, dann
				melde Dich unbedingt bei
				<a href="mailto:people@tech-academy.io"
					>people@tech-academy.io</a
				>.
			</p>

			<p>
				Falls Du uns noch nicht auf Social Media folgst, hier die Links
				zu unseren
				<a href="https://www.instagram.com/techacademy_/">Instagram</a>
				und
				<a href="https://www.linkedin.com/company/techacdmy/"
					>Linkedin</a
				>
				Accounts.
			</p>

			<p>
				Wir hoffen sehr, dass Du viel Neues lernen und deinen Horizont
				erweitern konntest.
			</p>

			<p>
				Liebe Grüße,<br />
				Dein TechAcademy Team
			</p>
		`,
		attachments: [
			{
				filename: `${submission.fileName}.pdf`,
				path: `${process.cwd()}/certificates/pdf/${
					submission.fileName
				}.pdf`,
			},
		],
	};

	transporter.sendMail(mailOptions);
}
