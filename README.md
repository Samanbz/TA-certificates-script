# Certificates Script

This project creates certificates for the participants of TechAcademy and sends them with email

## Installation

To use this project, first download it from GitHub and then install the required dependencies.

### Steps to install the project:

1. Clone the project

There are two ways to clone the project to your local device.

You can either run this command in the Terminal:

```bash
git clone https://github.com/racc0909/certificates.git
```

Or you can run this command:

```bash
git@github.com:racc0909/certificates-script.git
```

2. Install the dependencies

```bash
npm install
```

### Mailversand vorbereiten

With this program, you can also directly send the certificates by email. For this, you need to create a .env file and add two variables. One variable is the email address from which you want to send the certificates and the other variable is your password, which you have to get from the Google Account Manager. Follow these [instructions](https://support.google.com/accounts/answer/185833) or do the following:

You can follow these steps to get your app password:

1. Log in to your Google account
2. Go to security
3. Under Signing in to Google enable 2-Step Verification
4. Under Signing in to Google click on App passwords.
5. You'll now generate a new password. Select the app as Mail and the device as Other (Custom name) and name it.
6. Save the app password in the .env file

## Save Templates

### Excel Template

For the script to work, you need to place the Excel file with the ratings in the `data` folder. Make sure that the file is named `Bewertungen.xlsx`. The Excel file must have the following columns in the correct order and the individual rows must be in the correct format:

| Vorname | Nachname   | Track                   | Level           | Workshops                      | Email             | Kommentar              |
| ------- | ---------- | ----------------------- | --------------- | ------------------------------ | ----------------- | ---------------------- |
| John    | Doe        | Web Development         | Anfänger        | [Unternehmen 1, Unternehmen 2] | email@adresse.com | Hallo Lieber, ...      |
| Max     | Mustermann | Data Science mit R      | Fortgeschritten | [Unternehmen 1]                | email@adresse.com | Sehr gutes Projekt ... |
| Lisa    | Musterfrau | Data Science mit Python | Anfänger        | []                             | email@adresse.com | ...                    |

### Word Templates

In addition to the Excel template, the Word templates must also be provided. For each track and for each level, a Word template must be placed in the `templates` folder.

In the template, you can insert the following variables so that the script can fill them out.

-   {{name}}
-   {{track}}
-   {{vorname}}
-   {{workshops}}
-   {{workshopsList}}
-   {{date}}

The variable {{workshops}} renders the following string, if the person has attended at least one workshop:

`{{data.firstName}} also took part in workshops with the following companies:`

The variable {{workshopsList}} creates a bullet point for each workshop attended if the person has attended at least one workshop.

## Run the code

Once you have installed all dependencies and placed all files, you can start the program:

First you can create all the certificates with the command `npm run create-certificates`. You can inspect the certificates and check for errors in the certificates folder. If there are no errors you can run the [python script]() to convert the docx files to pdfs.

If you want to send the pdfs to your participant. You have to put your comments and certificates pdfs into the pdf directory. Then you can run the command `npm run send-email` to send the emails to the participants. This can take a while. You will see a progreebar in the terminal indicating the progress.
