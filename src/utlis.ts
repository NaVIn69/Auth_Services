export const DiscountPrice = (price: number, percentage: number) => {
    return price - price * (percentage / 100);
};
