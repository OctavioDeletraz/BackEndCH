function productDTO(product, _id, timestamp) {
    return {
        ...product,
        _id,
        timestamp
    }
}

export default productDTO