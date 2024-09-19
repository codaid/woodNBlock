const PrivacyPolicyPage = () => {
    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="mb-8 text-center text-4xl font-bold">
                Politique de Confidentialité
            </h1>
            <p className="mb-4 text-center text-sm text-gray-600">
                Dernière mise à jour : 09/09/2024
            </p>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">
                    1. Collecte des données personnelles
                </h2>
                <p className="mb-4">
                    Dans le cadre de nos activités, nous collectons les
                    informations suivantes via nos formulaires en ligne et
                    interactions directes :
                </p>
                <ul className="mb-4 ml-5 list-disc">
                    <li>Prénom et nom</li>
                    <li>Adresse de domicile</li>
                    <li>Adresse du projet de construction</li>
                    <li>Numéro de parcelle cadastrale</li>
                    <li>Adresse e-mail</li>
                    <li>Numéro de téléphone</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">
                    2. Finalité de la collecte des données
                </h2>
                <p className="mb-4">
                    Les données personnelles que nous collectons sont utilisées
                    pour :
                </p>
                <ul className="mb-4 ml-5 list-disc">
                    <li>
                        Générer des leads et répondre à vos demandes concernant
                        nos produits et services.
                    </li>
                    <li>
                        Assurer le suivi de vos projets de construction et vous
                        proposer un accompagnement personnalisé.
                    </li>
                    <li>
                        Vous proposer des produits complémentaires à votre kit
                        de construction en fonction de vos centres
                        d&apos;intérêt.
                    </li>
                    <li>
                        Vous envoyer des nouveautés et offres commerciales, sous
                        réserve de votre consentement.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">
                    3. Partage des données personnelles
                </h2>
                <p className="mb-4">
                    Nous pouvons partager vos informations avec des partenaires
                    de confiance susceptibles de vous fournir des services ou
                    produits complémentaires à ceux de Wood&apos;N Block. Ces
                    partenaires sont soumis aux mêmes obligations de
                    confidentialité et de sécurité.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">
                    4. Durée de conservation des données
                </h2>
                <p className="mb-4">
                    Vos données personnelles sont conservées aussi longtemps que
                    nécessaire pour les finalités pour lesquelles elles ont été
                    collectées. Nous pouvons également les conserver à des fins
                    légales ou de conformité réglementaire.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">
                    5. Droits des utilisateurs
                </h2>
                <p className="mb-4">
                    Vous disposez des droits suivants concernant vos données
                    personnelles :
                </p>
                <ul className="mb-4 ml-5 list-disc">
                    <li>Droit d’accès</li>
                    <li>Droit de rectification</li>
                    <li>Droit à l’effacement</li>
                    <li>Droit à la portabilité des données</li>
                </ul>
                <p className="mb-4">
                    Pour exercer ces droits, vous pouvez nous contacter par
                    e-mail à{" "}
                    <a
                        href="mailto:contact@woodnblock.com"
                        className="text-blue-500"
                    >
                        contact@woodnblock.com
                    </a>{" "}
                    ou par courrier à 178 rue Jules BERTAUT, 97430 Le Tampon.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">
                    6. Hébergement et sécurité des données
                </h2>
                <p className="mb-4">
                    Vos données sont hébergées en France par notre prestataire
                    LWS. Nous mettons en œuvre les meilleures pratiques de
                    sécurité pour protéger vos informations contre tout accès
                    non autorisé.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">
                    7. Modifications de cette politique
                </h2>
                <p className="mb-4">
                    Nous nous réservons le droit de modifier cette Politique de
                    Confidentialité à tout moment. Toute modification sera
                    publiée sur cette page.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">8. Contact</h2>
                <p className="mb-4">
                    Pour toute question concernant cette politique, vous pouvez
                    nous contacter à{" "}
                    <a
                        href="mailto:contact@woodnblock.com"
                        className="text-blue-500"
                    >
                        contact@woodnblock.com
                    </a>{" "}
                    ou à notre adresse : 178 rue Jules BERTAUT, 97430 Le Tampon.
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicyPage;
