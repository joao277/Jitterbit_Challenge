function mapOrderRequest(body) {
    if (!body.numeroPedido || !body.valorTotal || !body.dataCriacao || !Array.isArray(body.items)) {
        throw new Error("JSON do pedido inválido");
    }
    return {
        orderId: body.numeroPedido.split('-')[0],
        value: body.valorTotal,
        creationDate: new Date(body.dataCriacao),
        items: body.items.map(item => {
            if (!item.idItem || !item.quantidadeItem || !item.valorItem) {
                throw new Error("Item do pedido inválido");
            }
            return {
                productId: Number(item.idItem),
                quantity: Number(item.quantidadeItem),
                price: Number(item.valorItem)
            }
        })
    }
}

module.exports = { mapOrderRequest };