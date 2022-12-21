export const addLeadinZero = (n: number) => {
	return n < 10 ? '0' + n : n;
};

export const priceToStr = (price: number) => {
    const priceStr = price.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
	return `${priceStr}`;
};
