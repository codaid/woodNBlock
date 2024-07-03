export const removePdfExtension = (title: string): string => {
    if (title.endsWith(".pdf")) {
        return title.slice(0, -4);
    }
    return title;
};

export const addPdfExtension = (title: string): string => {
    if (title.endsWith(".pdf")) {
        return title + ".pdf";
    }
    return title;
};
