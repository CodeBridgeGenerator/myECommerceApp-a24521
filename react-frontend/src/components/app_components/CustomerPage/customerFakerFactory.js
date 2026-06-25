
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
customerId: faker.lorem.sentence(1),
fullName: faker.lorem.sentence(1),
phoneNumber: faker.lorem.sentence(1),
email: faker.internet.email(),
password: "asdf123",

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
