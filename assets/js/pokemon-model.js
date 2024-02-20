class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;

    constructor (number, name, types, photo) {
        this.number = number;
        this.name = name;
        this.type = types[0]; // Convert single value to array if it's not already
        this.types = types;
        this.photo = photo;
    };
};