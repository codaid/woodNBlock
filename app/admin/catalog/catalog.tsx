"use client";

import { Button } from "@/components/ui/button";
import ShowError from "@/components/ui/error";
import Loader from "@/components/ui/loader";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { deleteCatalog, getCatalogs } from "@/services/catalogServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LuTrash2 } from "react-icons/lu";

const CatalogAdmin = () => {
    const queryClient = useQueryClient();
    const {
        data: catalogs,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["catalogs"],
        queryFn: async () => await getCatalogs(),
    });
    const { mutate, isPending } = useMutation({
        mutationFn: async (catId: string) => await deleteCatalog(catId),
        onSuccess: (res) => {
            if (res) {
                toast.success("Supprimer avec succés.");
                queryClient.invalidateQueries({ queryKey: ["catalogs"] });
            } else {
                toast.error("Une erreur est survenue.");
            }
        },
    });

    if (isLoading) return <Loader />;

    if (isError) return <ShowError errorMessage={error.message} />;

    return (
        <Table>
            <TableCaption>Listes des Catalogues</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Nom</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {catalogs &&
                    catalogs.map((cat) => (
                        <TableRow key={cat.id}>
                            <TableCell className="font-medium">
                                {cat.title}
                            </TableCell>
                            <TableCell>
                                <Button
                                    className="mt-2 w-full"
                                    size="icon"
                                    variant="destructive"
                                    onClick={() => mutate(cat.id)}
                                >
                                    <LuTrash2 />
                                    {isPending && <Loader className="ml-2" />}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default CatalogAdmin;
