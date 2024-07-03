import { schemaUserData, t_userData } from "@/schemaType";

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
