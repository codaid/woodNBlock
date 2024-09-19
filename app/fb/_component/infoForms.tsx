"use client";

import { Checkbox } from "@/components/ui/checkbox";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useForm } from "react-hook-form";
import { ourServices, rdvTypeSentence } from "./constante";
import { schemaInfoForm, t_infoForm } from "./typeInfoForm";

const InfoForms = () => {
    const form = useForm<t_infoForm>({
        resolver: zodResolver(schemaInfoForm),
        defaultValues: {
            firstname: "",
            lastname: "",
            rdvType: undefined,
        },
    });

    const onSuccess = () => {
        console.log("success");
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
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSuccess, onError)}>
                    <Heading as="h2" className="ml-5 p-5">
                        Fiche contact
                    </Heading>
                    <FormField
                        control={form.control}
                        name="rdvType"
                        render={({ field }) => (
                            <FormItem className="w-fit">
                                {rdvTypeSentence.map((item) => (
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
                                                onCheckedChange={(checked) =>
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
                                ))}
                            </FormItem>
                        )}
                    />

                    <Heading as="h2" className="ml-5 p-5">
                        Coordonnées du contact
                    </Heading>

                    <p className="text-sm lg:text-base font-normal text-secondary py-4">
                        Les informations demandées ci-dessous servent à vous
                        mettre en relation avec la personne la plus proche de
                        chez vous en cas de besoin de rendez-vous
                    </p>

                    <div className="flex flex-col gap-y-4 border p-4">
                        <div className="grid gap-x-2 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prénom</FormLabel>
                                        <FormControl>
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

                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom</FormLabel>
                                        <FormControl>
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
                        </div>

                        <div className="grid grid-cols-2 gap-x-2 pt-4">
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
                            <FormField
                                control={form.control}
                                name="address.postCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Code postale</FormLabel>
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
                            <FormField
                                control={form.control}
                                name="address.city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ville</FormLabel>
                                        <FormControl>
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
                        </div>

                        <div className="grid grid-cols-2 gap-x-2 pt-4">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Télephone</FormLabel>
                                        <FormControl>
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
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
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
                        </div>
                    </div>

                    {/* constructionProject */}
                    {rdvTypeWatch?.includes("constructionProject") && (
                        <>
                            <Heading as="h2" className="ml-5 p-5">
                                Proget de construction
                            </Heading>

                            <div className="flex flex-col gap-y-4 border p-4">
                                <FormField
                                    control={form.control}
                                    name="constructionProject.haveBuildingSite"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
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
                                                    (Terrain, toiture plate,
                                                    autres types
                                                    d’agrandissement, …)
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                {haveSiteBuildingWatch === true && (
                                    <div className="grid sm:grid-cols-2 gap-x-2">
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
                                        <FormField
                                            control={form.control}
                                            name="constructionProject.parcelNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Numéro de parcel
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
                                    </div>
                                )}

                                <FormField
                                    control={form.control}
                                    name="constructionProject.havePlan"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    J’ai déjà un plan défini
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
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    J’ai une idée précise ou
                                                    assez précise de mon projet
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
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    J’aimerais (tout de même)
                                                    voir vos modèles catalogues
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </>
                    )}
                    {rdvTypeWatch?.includes("becomeReseller") && (
                        <>
                            <Heading as="h2" className="ml-5 p-5">
                                Devenir revendeur
                            </Heading>

                            <div className="flex flex-col gap-y-4 border p-4">
                                <FormField
                                    control={form.control}
                                    name="reseller.haveIndividualBusiness"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
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
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    Je suis le(la)
                                                    représentant(e) légal(e)
                                                    d’une Société
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
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    J’aimerais en savoir plus
                                                    avant d’ouvrir mon
                                                    entreprise
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </>
                    )}
                    {rdvTypeWatch?.includes("becomeProvider") && (
                        <>
                            <Heading as="h2" className="ml-5 p-5">
                                Devenir partenaire
                            </Heading>

                            <div className="flex flex-col gap-y-4 border p-4">
                                <FormField
                                    control={form.control}
                                    name="provider"
                                    render={({ field }) => (
                                        <FormItem className="w-fit grid grid-cols-2 gap-2">
                                            {ourServices.map((service) => (
                                                <FormControl>
                                                    <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                                        <Checkbox
                                                            id={service}
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
                                                            htmlFor={service}
                                                            className="space-y-1 leading-none"
                                                        >
                                                            <span>
                                                                {service}
                                                            </span>
                                                        </FormLabel>
                                                    </div>
                                                </FormControl>
                                            ))}
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </>
                    )}
                </form>
            </Form>
        </div>
    );
};

export default InfoForms;
