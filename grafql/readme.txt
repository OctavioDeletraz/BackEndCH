graphql instructions


query getAll{
  getAll{
    id,
    tittle
  }
}
mutation create{
  create(data:{
    tittle: "lapicera",
    desc: "20",
    img: "http://lapicera.com"
    price: "400"
  }){
    id
  }
}
mutation delete{
  delete(id:"<id>")
}

mutation update{
  update(
    id:"<id>",
    data:{
    	tittle: "borrador"
  	}) {
    id
  }
}