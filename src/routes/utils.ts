export const priceToStr = (price: number) => {
    return `${price.toFixed(2).replace('.', ',')}`
}