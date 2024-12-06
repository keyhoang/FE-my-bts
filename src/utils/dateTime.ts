export const formatDate = (date: Date | string, delimiter: string = "-"): string => {
    const d = typeof date === "string" ? new Date(date) : date;

    if (isNaN(d.getTime())) {
        throw new Error("Invalid date");
    }

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return [year, month, day].join(delimiter);
};

export const handleDateFormSearch = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    return [formatDate(sevenDaysAgo), formatDate(today)];
}