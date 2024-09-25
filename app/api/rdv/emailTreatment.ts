export const templateMail = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
            rel="stylesheet"
        />
        <title>Nouveau Match!</title>
        <style>
            html {
                background-color: hsl(28 95% 33%);
            }
            body,
            p {
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 30px auto;
                padding: 20px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                border-radius: 10px;
                font-family: "Poppins", Arial, sans-serif;
                background-color: #fff;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .header img {
                max-width: 300px;
                height: auto;
            }
            .header h1 {
                margin-left: 20px;
            }
            .content {
                background-color: #f5f5f5;
                padding: 20px;
                border-radius: 5px;
            }
            .content a {
                color: hsl(28 95% 33%);
            }
            .content span {
                font-weight: 600;
                text-transform: uppercase;
            }
            .message {
                font-size: 18px;
                line-height: 1.4;
                margin-bottom: 20px;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <img
                    src="https://woodnblock.com/logo.jpeg"
                    alt="Logo de l'entreprise"
                />
            </div>
            <div class="content">
                <p class="message">BODY_MESSAGE</p>
            </div>
            <div class="footer">
                <p>
                    Merci d'utiliser notre service!<br />
                    L'équipe de Wood'N Block
                </p>
            </div>
        </div>
    </body>
</html>
`;

export const generateProspectTable = (prospect: any) => {
    return `
        <table>
            <tr>
                <th>Prénom</th>
                <td>${prospect.firstname}</td>
            </tr>
            <tr>
                <th>Nom</th>
                <td>${prospect.lastname}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>${prospect.email}</td>
            </tr>
            <tr>
                <th>Téléphone</th>
                <td>${prospect.phone}</td>
            </tr>
            <tr>
                <th>Type de rendez-vous</th>
                <td>${prospect.rdvTypes.join(", ")}</td>
            </tr>
            ${
                prospect.rdvTypes.includes("constructionProject")
                    ? `
            <tr>
                <th>A un terrain</th>
                <td>${
                    prospect.constructionProject_haveBuildingSite
                        ? "Oui"
                        : "Non"
                }</td>
            </tr>
            <tr>
                <th>Code postal du chantier</th>
                <td>${
                    prospect.constructionProject_buildingPostCode || "N/A"
                }</td>
            </tr>
            <tr>
                <th>Numéro de parcel</th>
                <td>${prospect.constructionProject_parcelNumber || "N/A"}</td>
            </tr>
            <tr>
                <th>A un plan défini</th>
                <td>${
                    prospect.constructionProject_havePlan ? "Oui" : "Non"
                }</td>
            </tr>
            <tr>
                <th>A une idée précise du projet</th>
                <td>${
                    prospect.constructionProject_haveIdeaProject ? "Oui" : "Non"
                }</td>
            </tr>
            <tr>
                <th>Veux voir les catalogues</th>
                <td>${
                    prospect.constructionProject_wantSeeTemplate ? "Oui" : "Non"
                }</td>
            </tr>
            `
                    : ""
            }
            ${
                prospect.rdvTypes.includes("becomeReseller")
                    ? `
            <tr>
                <th>A une entreprise individuelle</th>
                <td>${
                    prospect.reseller_haveIndividualBusiness ? "Oui" : "Non"
                }</td>
            </tr>
            <tr>
                <th>Est le représentant légale d'une société</th>
                <td>${prospect.reseller_legalRepresentativ ? "Oui" : "Non"}</td>
            </tr>
            <tr>
                <th>S'informer avant d'ouvrir entreprise</th>
                <td>${
                    prospect.reseller_wantMoreBeforeOpeningBusiness
                        ? "Oui"
                        : "Non"
                }</td>
            </tr>
            `
                    : ""
            }
            ${
                prospect.providerServices
                    ? `
            <tr>
                <th>Prestataire de services</th>
                <td>${prospect.providerServices.join(", ")}</td>
            </tr>
            `
                    : ""
            }
        </table>
    `;
};
