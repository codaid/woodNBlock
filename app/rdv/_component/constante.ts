export const rdvTypeSentence: {
    id: "constructionProject" | "becomeReseller" | "becomeProvider";
    title: string;
    description: string;
}[] = [
    {
        id: "constructionProject",
        title: "Avancer sur projet de construction",
        description:
            "J’aimerais connaitre la qualité de votre produit, avoir un devis sur mon projet de construction et connaitre vos procédures ainsi que vos délais de mise en oeuvre",
    },
    {
        id: "becomeReseller",
        title: "Éventuellement devenir revendeur",
        description:
            "J’aimerais avoir plus d’information sur vos conditions de partenariat ainsi que sur votre système de rémunération",
    },
    {
        id: "becomeProvider",
        title: "Éventuellement postuler comme partenaire de construction et de finition sur les chantiers de nos clients",
        description:
            "J’aimerais en savoir plus sur vos conditions de partenariat",
    },
];

export const ourServices = [
    "VRD",
    "Terrassement",
    "Fondation et pilotis",
    "Gros oeuvre",
    "Pose de menuiseries",
    "Électricité (classic ou domotique)",
    "Plomberie",
    "Assainissement",
    "Charpente, Toiture",
    "Etanchéité",
    "Revêtement (saturateur, lasure, vernis, peinture, ...)",
    "Clôture Portail",
    "Mur de soutènement (Moellons ou enrochement)",
    "Placoplâtre",
    "Carrelage",
    "Ebénisterie",
    "Piscine",
    "Permis de construire",
    "Architect d'intérieur",
    "Jardinier, paysagiste",
    "Autres",
] as const;
