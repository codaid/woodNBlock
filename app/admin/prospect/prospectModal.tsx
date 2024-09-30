import { writeRdvTypesTitle } from "@/components/server/prospect.s";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { t_prospect } from "@/schemaType";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";

type Props = {
    prospect: t_prospect;
    close: () => void;
};

export const tableHeadingModalProspect = [
    { key: "createdAt", value: "Date de création" },
    { key: "firstname", value: "Prénom" },
    { key: "lastname", value: "Nom" },
    { key: "email", value: "Email" },
    { key: "phone", value: "Téléphone" },
    { key: "address_street", value: "Rue" },
    { key: "address_postCode", value: "Code postal" },
    { key: "address_city", value: "Ville" },
    { key: "rdvTypes", value: "Type de RDV" },
    {
        key: "constructionProject_haveBuildingSite",
        value: "A un lieu de construction",
    },
    {
        key: "constructionProject_buildingPostCode",
        value: "Code postal lieu de construction",
    },
    { key: "constructionProject_parcelNumber", value: "Numéro de parcelle" },
    { key: "constructionProject_havePlan", value: "A un plan défini" },
    {
        key: "constructionProject_haveIdeaProject",
        value: "A une idée précise du projet",
    },
    {
        key: "constructionProject_wantSeeTemplate",
        value: "Aimerais voir le catalogue",
    },
    {
        key: "reseller_haveIndividualBusiness",
        value: "A une entreprise individuelle",
    },
    {
        key: "reseller_legalRepresentativ",
        value: "Est représentant légale société",
    },
    {
        key: "reseller_wantMoreBeforeOpeningBusiness",
        value: "Informations avant ouverture entreprise",
    },
    { key: "providerServices", value: "Veux devenir partenaire" },
];

const ProspectModal = ({ prospect, close }: Props) => {
    const tableAnswerModalProspect = [
        {
            key: "createdAt",
            value: format(new Date(prospect.createdAt), "dd/MM/yyyy HH:mm", {
                locale: fr,
            }),
        },
        { key: "firstname", value: prospect.firstname ?? "N/A" },
        { key: "lastname", value: prospect.lastname ?? "N/A" },
        { key: "email", value: prospect.email ?? "N/A" },
        { key: "phone", value: prospect.phone ?? "N/A" },
        { key: "address_street", value: prospect.address_street ?? "N/A" },
        { key: "address_postCode", value: prospect.address_postCode ?? "N/A" },
        { key: "address_city", value: prospect.address_city ?? "N/A" },
        { key: "rdvTypes", value: prospect.rdvTypes ?? "N/A" },
        {
            key: "constructionProject_haveBuildingSite",
            value: prospect.constructionProject_haveBuildingSite ?? "N/A",
        },
        {
            key: "constructionProject_buildingPostCode",
            value: prospect.constructionProject_buildingPostCode ?? "N/A",
        },
        {
            key: "constructionProject_parcelNumber",
            value: prospect.constructionProject_parcelNumber ?? "N/A",
        },
        {
            key: "constructionProject_havePlan",
            value: prospect.constructionProject_havePlan ?? "N/A",
        },
        {
            key: "constructionProject_haveIdeaProject",
            value: prospect.constructionProject_haveIdeaProject ?? "N/A",
        },
        {
            key: "constructionProject_wantSeeTemplate",
            value: prospect.constructionProject_wantSeeTemplate ?? "N/A",
        },
        {
            key: "reseller_haveIndividualBusiness",
            value: prospect.reseller_haveIndividualBusiness ?? "N/A",
        },
        {
            key: "reseller_legalRepresentativ",
            value: prospect.reseller_legalRepresentativ ?? "N/A",
        },
        {
            key: "reseller_wantMoreBeforeOpeningBusiness",
            value: prospect.reseller_wantMoreBeforeOpeningBusiness ?? "N/A",
        },
        { key: "providerServices", value: prospect.providerServices ?? "N/A" },
    ];

    const writeArray = (ar: any, rdvTypes: boolean) => {
        if (Array.isArray(ar))
            return (
                <ul>
                    {ar.map((el: string) => (
                        <li>{rdvTypes ? writeRdvTypesTitle(el) : el}</li>
                    ))}
                </ul>
            );
    };

    return (
        <div
            onClick={close}
            className="fixed left-0 top-0 flex size-full items-center justify-center"
        >
            <div className="size-fit rounded-lg bg-color_primary p-12 px-6 py-10 text-white dark:bg-orange-950">
                <Table>
                    <TableBody>
                        {tableHeadingModalProspect.map((heading, index) => (
                            <TableRow key={heading.key}>
                                <TableCell className="font-bold">
                                    <motion.span>{heading.value}</motion.span>
                                </TableCell>
                                <TableCell>
                                    <motion.span
                                        layoutId={`${heading.key}-${prospect.id}`}
                                    >
                                        {Array.isArray(
                                            tableAnswerModalProspect[index]
                                                .value
                                        ) ? (
                                            <>
                                                {" "}
                                                {writeArray(
                                                    tableAnswerModalProspect[
                                                        index
                                                    ].value,
                                                    heading.key === "rdvTypes"
                                                )}{" "}
                                            </>
                                        ) : (
                                            <>
                                                {}
                                                {
                                                    tableAnswerModalProspect[
                                                        index
                                                    ].value
                                                }
                                            </>
                                        )}
                                    </motion.span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ProspectModal;
