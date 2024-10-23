import { schemaUserData, t_userData, t_userUpdate } from "@/schemaType";

export const getUserData = async (
    userId: string
): Promise<t_userData | null> => {
    try {
        if (!userId) return null;
        const response = await fetch(`/api/user/getData`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(
                    "L'utilisateur n'a pas été trouvé. Veuillez rééssayé. Contactez le support support@lesbrascasses.com si le probleme perciste"
                );
            }
            throw new Error(
                "Une erreur inconnue s'est produite. Veuillez rééssayé. Contactez le support support@lesbrascasses.com si le probleme perciste"
            );
        }
        const data = await response.json();
        const dataParse = schemaUserData.parse(data.userData);
        return dataParse;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const updateUser = async (
    dataUpdate: t_userUpdate
): Promise<boolean> => {
    try {
        const response = await fetch("/api/user", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataUpdate),
        });
        if (!response.ok) {
            switch (response.status) {
                case 401:
                    throw new Error(
                        "Vous n'êtes pas identifié. Veuillez vous deconnecter et réessayer"
                    );

                case 403:
                    throw new Error(
                        "Vous n'êtes pas autorisé à effectuer cette action."
                    );

                case 404:
                    throw new Error(
                        "Votre `id` ou votre compte utilisateur est introuvable. Veuillez vous deconnecter et réessayer"
                    );

                default:
                    throw new Error(
                        "Une erreur inconnu s'est produite. Veuillez réessayer. Contacter le support si le probleme persiste."
                    );
            }
        }
        return true;
    } catch (error) {
        throw new Error("Une erreur est survenue");
    }
};

export const deleteUser = async (userId: string) => {
    try {
        return await fetch("/api/user", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        });
    } catch (error) {
        console.log(error);
        throw new Error("Une erreur inconnu est survenue");
    }
};
