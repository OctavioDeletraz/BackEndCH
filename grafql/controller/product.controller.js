import ProductApi from "../api/product.api.js";

import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const productSchema = buildSchema(`
    input ProductInput{
        tittle: String,
        desc: String,
        img: String,
        price: String
    }
    type Product{
        id: ID!
        tittle: String,
        desc: String,
        img: String,
        price: String
    }
    type Query {
        getAll: [Product],
    }
    type Mutation {
        update(id: ID!, data: ProductInput): Product,
        create(data: ProductInput): Product,
        delete(id: ID!): String
    }
`)
export default class GraphqlProductController {
    constructor() {
        const api = new ProductApi()
        return graphqlHTTP({
            schema: productSchema,
            rootValue: {
                getAll: api.getAll,
                update: api.update,
                create: api.create,
                delete: api.delete,
            },
            graphiql: true
        })
    }

}