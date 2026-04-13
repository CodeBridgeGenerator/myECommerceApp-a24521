
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
billingId: faker.lorem.sentence(1),
billingName: faker.lorem.sentence(1),
customerId: faker.lorem.sentence(1),
billingAddress: faker.lorem.sentence(1),
paymentMethod: faker.lorem.sentence(1),
transactionId: faker.lorem.sentence(1),
transactionDate: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
