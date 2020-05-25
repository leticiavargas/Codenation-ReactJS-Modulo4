const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getPromotion(products){
	const uniqueCategories = [ ...new Set(products.map((product)=> product.category)) ];	
	return promotions[uniqueCategories.length - 1];
}

function getPrice(products, promotion){
	return (products.reduce((result, product)=>{ 
				result.regularPrice += product.regularPrice;
				const productPromotion = product.promotions.find(({ looks }) => looks.includes(promotion)); 
				
				result.totalPrice += (productPromotion ? productPromotion.price : product.regularPrice);
				return result;
			},{regularPrice: 0, totalPrice: 0}));
}
function getDiscount(regularPrice, totalPrice ){
	const discountDiffer = regularPrice - totalPrice;
	const discountPercentual = ((discountDiffer * 100) / regularPrice);
	return {discountDiffer, discountPercentual};
}

function getShoppingCart(ids, productsList) {
	const cartProducts = productsList.filter((product)=> ids.includes(product.id));
	const products = cartProducts.map(({ name, category })=> ({ name, category }));
	const promotion = getPromotion(cartProducts);
	const {regularPrice, totalPrice} = getPrice(cartProducts, promotion);
	const {discountDiffer, discountPercentual} = getDiscount(regularPrice, totalPrice);
	
	let price = totalPrice.toFixed(2);
	let discountValue = discountDiffer.toFixed(2);
	let discount = discountPercentual.toFixed(2)+ '%';
	

	return {products,
			promotion,
			totalPrice: price,
			discountValue,
			discount };
}

module.exports = { getShoppingCart };