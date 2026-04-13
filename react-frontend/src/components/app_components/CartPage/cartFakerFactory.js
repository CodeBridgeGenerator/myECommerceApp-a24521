
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
cartId: faker.lorem.sentence(1),
customerId: faker.lorem.sentence(1),
productId: faker.lorem.sentence(1),
productName: faker.lorem.sentence(1),
quantity: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
