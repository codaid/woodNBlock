"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Bounce from "@/components/ui/codaidComp/motion/bounce";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ourServices, rdvTypeSentence } from "./constante";
import PicturesGallery from "./picturesGallery";
import { schemaInfoForm, t_infoForm } from "./typeInfoForm";

const InfoForms = () => {
    const router = useRouter();
    const form = useForm<t_infoForm>({
        resolver: zodResolver(schemaInfoForm),
        defaultValues: {
            firstname: "",
            lastname: "",
            rdvType: undefined,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: t_infoForm) => {
            try {
                return await fetch(`/api/rdv`, {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(values),
                });
            } catch (error) {
                toast.error("Une erreur inconnue est survenue");
            }
        },
        onSuccess: async (res) => {
            if (res && !res.ok)
                return toast.error(
                    "Erreur lors de l'envoie du formulaire. Veuillez réessayer"
                );
            toast.success("Informations transmises.");
            router.push("/rdv/thanks");
        },
        onError: (error) => {
            console.log(error);
            toast.error("Une erreur inconnue est survenue");
        },
    });

    const onSuccess = (values: t_infoForm) => {
        mutate(values);
    };

    const onError = (error: any) => {
        console.error(error);
    };

    const rdvTypeWatch = form.watch("rdvType");
    const haveSiteBuildingWatch = form.watch(
        "constructionProject.haveBuildingSite"
    );

    const onCheckedChange = (
        checked: CheckedState,
        field: any,
        name: string
    ) => {
        const newValue = field.value || []; // Assure que field.value est toujours un tableau
        if (checked) {
            field.onChange([...newValue, name]);
        } else {
            field.onChange(newValue.filter((item: any) => item !== name));
        }
        console.log(form.getValues());
    };

    return (
        <div className="relative">
            {isPending && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-primary-foreground/50 backdrop-blur-sm">
                    <Loader className="size-6" />
                </div>
            )}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSuccess, onError)}
                    id="contactForms"
                    className={isPending ? "pointer-events-none" : ""}
                >
                    <Bounce className="mt-14">
                        <Heading as="h2" className="ml-5 p-5">
                            Fiche contact
                        </Heading>
                    </Bounce>

                    <FormField
                        control={form.control}
                        name="rdvType"
                        render={({ field }) => (
                            <FormItem
                                className={
                                    form.formState.errors.rdvType
                                        ? "w-fit border border-destructive"
                                        : "w-fit"
                                }
                            >
                                {rdvTypeSentence.map((item, index) => (
                                    <Bounce>
                                        <FormControl>
                                            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                <Checkbox
                                                    id={item.id}
                                                    checked={
                                                        (field.value &&
                                                            field.value.includes(
                                                                item.id
                                                            )) ||
                                                        false
                                                    }
                                                    onCheckedChange={(
                                                        checked
                                                    ) =>
                                                        onCheckedChange(
                                                            checked,
                                                            field,
                                                            item.id
                                                        )
                                                    }
                                                />
                                                {/* <div className="space-y-1 leading-none"> */}
                                                <FormLabel
                                                    htmlFor={item.id}
                                                    className="space-y-1 leading-none"
                                                >
                                                    <span>{item.title}</span>
                                                    <FormDescription>
                                                        {item.description}
                                                    </FormDescription>
                                                </FormLabel>
                                                {/* </div> */}
                                            </div>
                                        </FormControl>
                                    </Bounce>
                                ))}
                            </FormItem>
                        )}
                    />
                    <PicturesGallery
                        reverse
                        images={[
                            "/images/photo_01.jpg",
                            "/images/photo_02.jpg",
                            "/images/photo_03.jpg",
                        ]}
                    />

                    {/* Coordonée */}
                    <Bounce className="mt-14">
                        <Heading as="h2" className="ml-5 p-5">
                            Coordonnées du contact
                        </Heading>
                    </Bounce>

                    <Bounce>
                        <p className="py-4 text-sm font-normal text-secondary dark:text-slate-400 lg:text-base">
                            Les informations demandées ci-dessous servent à vous
                            mettre en relation avec la personne la plus proche
                            de chez vous en cas de besoin de rendez-vous
                        </p>
                    </Bounce>

                    <div className="flex flex-col gap-y-4 border p-4">
                        <div className="grid gap-x-2 sm:grid-cols-2">
                            <Bounce>
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Prénom</FormLabel>
                                            <FormControl
                                                className={
                                                    form.formState.errors
                                                        .firstname
                                                        ? "border-destructive"
                                                        : ""
                                                }
                                            >
                                                <Input
                                                    placeholder="Prénom"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription></FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Bounce>

                            <Bounce>
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nom</FormLabel>
                                            <FormControl
                                                className={
                                                    form.formState.errors
                                                        .lastname
                                                        ? "border-destructive"
                                                        : ""
                                                }
                                            >
                                                <Input
                                                    type="text"
                                                    placeholder="DOE"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription></FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Bounce>
                        </div>

                        <div className="grid grid-cols-2 gap-x-2 pt-4">
                            <Bounce>
                                <FormField
                                    control={form.control}
                                    name="address.street"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>
                                                Adresse (facultative)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="1 rue du stade"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription></FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Bounce>

                            <Bounce>
                                <FormField
                                    control={form.control}
                                    name="address.postCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Code postale</FormLabel>
                                            <FormControl
                                                className={
                                                    form.formState.errors
                                                        .address?.postCode
                                                        ? "border-destructive"
                                                        : ""
                                                }
                                            >
                                                <Input
                                                    type="text"
                                                    placeholder="97400"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription></FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Bounce>

                            <Bounce className="col-span-2">
                                <FormField
                                    control={form.control}
                                    name="address.city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ville</FormLabel>
                                            <FormControl
                                                className={
                                                    form.formState.errors
                                                        .address?.city
                                                        ? "border-destructive"
                                                        : ""
                                                }
                                            >
                                                <Input
                                                    type="text"
                                                    placeholder="Saint-Denis"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription></FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Bounce>
                        </div>

                        <div className="grid grid-cols-2 gap-x-2 pt-4">
                            <Bounce>
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Télephone</FormLabel>
                                            <FormControl
                                                className={
                                                    form.formState.errors.phone
                                                        ? "border-destructive"
                                                        : ""
                                                }
                                            >
                                                <Input
                                                    type="number"
                                                    placeholder="069# ## ## ##"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription></FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Bounce>

                            <Bounce>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl
                                                className={
                                                    form.formState.errors.email
                                                        ? "border-destructive"
                                                        : ""
                                                }
                                            >
                                                <Input
                                                    type="email"
                                                    placeholder="mail@mail.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription></FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Bounce>
                        </div>
                    </div>

                    <PicturesGallery
                        images={[
                            "/images/photo_04.jpg",
                            "/images/photo_05.jpg",
                            "/images/photo_06.jpg",
                        ]}
                    />

                    {/* constructionProject */}
                    <AnimatePresence mode="popLayout">
                        {rdvTypeWatch?.includes("constructionProject") && (
                            <motion.div layout>
                                <Bounce key={"constructionProject"}>
                                    <Heading as="h2" className="ml-5 p-5">
                                        Proget de construction
                                    </Heading>

                                    <div
                                        className={`flex flex-col gap-y-4 border p-4 ${
                                            form.formState.errors
                                                .constructionProject
                                                ? "border-destructive"
                                                : ""
                                        }`}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="constructionProject.haveBuildingSite"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            J’ai déjà le lieu de
                                                            construction
                                                        </FormLabel>
                                                        <FormDescription>
                                                            (Terrain, toiture
                                                            plate, autres types
                                                            d’agrandissement, …)
                                                        </FormDescription>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                        {haveSiteBuildingWatch === true && (
                                            <motion.div
                                                layout
                                                className="grid gap-x-2 sm:grid-cols-2"
                                            >
                                                <Bounce>
                                                    <FormField
                                                        control={form.control}
                                                        name="constructionProject.buildingPostCode"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    Code postale
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="text"
                                                                        placeholder="97400"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormDescription></FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </Bounce>

                                                <Bounce>
                                                    <FormField
                                                        control={form.control}
                                                        name="constructionProject.parcelNumber"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    Numéro de
                                                                    parcel
                                                                    (optionnel)
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="text"
                                                                        placeholder="97400"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormDescription></FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </Bounce>
                                            </motion.div>
                                        )}

                                        <FormField
                                            control={form.control}
                                            name="constructionProject.havePlan"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            J’ai déjà un plan
                                                            défini
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="constructionProject.haveIdeaProject"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            J’ai une idée
                                                            précise ou assez
                                                            précise de mon
                                                            projet
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="constructionProject.wantSeeTemplate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            J’aimerais (tout de
                                                            même) voir vos
                                                            modèles catalogues
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </Bounce>
                            </motion.div>
                        )}

                        {/* becomeReseller */}
                        {rdvTypeWatch?.includes("becomeReseller") && (
                            <motion.div layout>
                                <Bounce key={"becomeReseller"}>
                                    <Heading as="h2" className="ml-5 p-5">
                                        Devenir revendeur
                                    </Heading>

                                    <div
                                        className={`flex flex-col gap-y-4 border p-4 ${
                                            form.formState.errors.reseller
                                                ? "border-destructive"
                                                : ""
                                        }`}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="reseller.haveIndividualBusiness"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            J’ai une Entreprise
                                                            individuel
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="reseller.legalRepresentativ"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            Je suis le(la)
                                                            représentant(e)
                                                            légal(e) d’une
                                                            Société
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="reseller.wantMoreBeforeOpeningBusiness"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            J’aimerais en savoir
                                                            plus avant d’ouvrir
                                                            mon entreprise
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </Bounce>
                            </motion.div>
                        )}

                        {/* becomeProvider */}
                        {rdvTypeWatch?.includes("becomeProvider") && (
                            <motion.div layout>
                                <Bounce key={"becomeProvider"}>
                                    <Heading as="h2" className="ml-5 p-5">
                                        Devenir partenaire
                                    </Heading>

                                    <div
                                        className={`flex flex-col gap-y-4 border p-4 ${
                                            form.formState.errors.provider
                                                ? "border-destructive"
                                                : ""
                                        }`}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="provider"
                                            render={({ field }) => (
                                                <FormItem className="grid w-fit grid-cols-2 gap-2">
                                                    {ourServices.map(
                                                        (service) => (
                                                            <FormControl>
                                                                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                                                    <Checkbox
                                                                        id={
                                                                            service
                                                                        }
                                                                        checked={
                                                                            (field.value &&
                                                                                field.value.includes(
                                                                                    service
                                                                                )) ||
                                                                            false
                                                                        }
                                                                        onCheckedChange={(
                                                                            checked
                                                                        ) =>
                                                                            onCheckedChange(
                                                                                checked,
                                                                                field,
                                                                                service
                                                                            )
                                                                        }
                                                                    />
                                                                    <FormLabel
                                                                        htmlFor={
                                                                            service
                                                                        }
                                                                        className="space-y-1 leading-none"
                                                                    >
                                                                        <span>
                                                                            {
                                                                                service
                                                                            }
                                                                        </span>
                                                                    </FormLabel>
                                                                </div>
                                                            </FormControl>
                                                        )
                                                    )}
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </Bounce>
                                <PicturesGallery
                                    images={[
                                        "/images/photo_12.jpg",
                                        "/images/photo_16.jpg",
                                        "/images/photo_17.jpg",
                                    ]}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div layout>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="mt-5 w-full bg-color_primary py-5"
                        >
                            Envoyer
                        </Button>
                    </motion.div>
                </form>
            </Form>
        </div>
    );
};

export default InfoForms;
