// ProspectsList.tsx
"use client";

import {
    updateProspectStatus,
    writeRdvTypesTitle,
    writeStatusTitle,
} from "@/components/server/prospect.s";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { t_prospect } from "@/schemaType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import ProspectModal from "./prospectModal";

type Props = {
    prospects: t_prospect[];
    nextOffset: number | null;
    prevOffset: number | null;
    totalProspects: number;
    offset: number;
    limit: number;
};

const ProspectsList = ({
    prospects,
    nextOffset,
    prevOffset,
    totalProspects,
    offset = 0,
    limit,
}: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [prospectSelected, setProspectSelected] = useState<t_prospect | null>(
        null
    );

    const handlePagination = (offset: number | null) => {
        if (offset !== null) {
            const params = new URLSearchParams(searchParams?.toString());
            params.set("offset", offset.toString());
            router.replace(`/admin/prospect/?${params.toString()}`);
        }
    };

    const setProspect = (prospect: t_prospect) => {
        setProspectSelected(prospect);
    };

    const closeModal = () => {
        setProspectSelected(null);
    };

    const start = offset + 1;
    const end = Math.min(offset + limit, totalProspects);

    return (
        <motion.div layout>
            <form className="rounded-lg border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell className="max-w-[150px]">Nom</TableCell>
                            <TableCell className="hidden md:table-cell">
                                <motion.span layoutId={`heading_title_email`}>
                                    Email
                                </motion.span>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <motion.span
                                    layoutId={`heading_title_rdvTypes`}
                                >
                                    Type de RDV
                                </motion.span>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <motion.span layoutId={`heading_title_status`}>
                                    Status
                                </motion.span>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {prospects.map((prospect) => (
                            <ProspectRow
                                prospect={prospect}
                                key={prospect.id}
                                callBack={setProspect}
                            />
                        ))}
                    </TableBody>
                </Table>
            </form>

            <div className="mr-5 mt-5 flex flex-row items-center justify-end gap-4">
                <div className="mt-4 text-sm">
                    Affichage de {start} - {end} sur {totalProspects}
                </div>
                <Button
                    className="mt-4"
                    variant="secondary"
                    onClick={() => handlePagination(prevOffset)}
                    disabled={prevOffset === null}
                >
                    <LuArrowLeft className="size-4" />
                </Button>
                <Button
                    disabled={!nextOffset}
                    className="mt-4"
                    variant="secondary"
                    onClick={() => handlePagination(nextOffset)}
                >
                    <LuArrowRight className="size-4" />
                </Button>
            </div>

            {/* Modal */}
            {prospectSelected && (
                <ProspectModal prospect={prospectSelected} close={closeModal} />
            )}
        </motion.div>
    );
};

const ProspectRow = ({
    prospect,
    callBack,
}: {
    prospect: t_prospect;
    callBack: (prospect: t_prospect) => void;
}) => {
    const prospectId = prospect.id;
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ["prospects"],
        mutationFn: async (status: "idle" | "treat") =>
            await updateProspectStatus(prospectId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["prospects"],
            });
        },
    });

    return (
        <TableRow onClick={() => callBack(prospect)}>
            <TableCell className="font-medium">
                <span>
                    <motion.span layoutId={`lastname-${prospect.id}`}>
                        {prospect.lastname}{" "}
                    </motion.span>
                    <motion.span layoutId={`firstname-${prospect.id}`}>
                        {prospect.firstname}
                    </motion.span>
                </span>
                <br />
                <motion.span layoutId={`createdAt-${prospect.id}`}>
                    {format(new Date(prospect.createdAt), "dd/MM/yyyy HH:mm", {
                        locale: fr,
                    })}
                </motion.span>
            </TableCell>
            <TableCell>
                <motion.span layoutId={`email-${prospect.id}`}>
                    {prospect.email}
                </motion.span>
                <br />
                <motion.span layoutId={`phone-${prospect.id}`}>
                    {prospect.phone}
                </motion.span>
            </TableCell>
            <TableCell>
                <ul>
                    {prospect.rdvTypes.map((rdv) => (
                        <li key={`${prospect.email}_${rdv}`}>
                            {writeRdvTypesTitle(rdv)}
                        </li>
                    ))}
                </ul>
            </TableCell>
            <TableCell>
                <Badge
                    className={`text-color_light ${
                        prospect.status === "idle"
                            ? "bg-[#a44f04]"
                            : "bg-green-600"
                    }`}
                >
                    {writeStatusTitle(prospect.status)}
                </Badge>
            </TableCell>
            <TableCell>
                <Button
                    disabled={isPending || prospect.status === "treat"}
                    onClick={() => mutate("treat")}
                    className="w-38 bg-orange-950 text-white transition-all ease-in-out hover:bg-orange-900"
                >
                    Marquer contacté{" "}
                    {isPending ? <Loader className="ml-4" /> : ""}{" "}
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default ProspectsList;
