export const getDaysInMonth = (month) => {
    const monthNumber = Number(month);

    if (!monthNumber || monthNumber < 1 || monthNumber > 12) {
        return 31;
    }

    if (monthNumber === 2) {
        return 29;
    }

    return [4, 6, 9, 11].includes(monthNumber) ? 30 : 31;
};
