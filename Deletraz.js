class User {
    constructor(name, lastName) {
        this.name = name;
        this.lastName = lastName;
        this.books = [];
        this.pets = [];
    }

    getFullName() {
        return `${this.name} ${this.lastName}`
    }

    addPet(pet) {
        this.pets.push(pet)
    }

    countPets() {
        return this.pets.length
    }

    addBook(title, author) {
        this.books.push({ title: title, author: author })
    }

    getBookNames() {
        let bookNames = this.books.map(elem => elem.title)
        return bookNames
    }
}

let octaviobooks = [
    {
        title: "El gato negro",
        author: "Edgar Allan Poe"
    },
    {
        title: "El cuervo",
        author: "Edgar Allan Poe"
    },
    {
        title: "El corazon delator",
        author: "Edgar Allan Poe"
    }
]

const userOctavio = new User("Octavio", "Deletraz", octaviobooks, [])

console.log(userOctavio);

console.log(userOctavio.getFullName())

userOctavio.addPet("Polola")
userOctavio.addPet("Senna")
console.log(userOctavio.pets)

console.log(userOctavio.countPets())

userOctavio.addBook("El solitario", "Horacio Quiroga")
console.log(userOctavio.books)

console.log(userOctavio.getBookNames())