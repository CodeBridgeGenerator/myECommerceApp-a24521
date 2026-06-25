
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
orderId: faker.lorem.sentence(""),
orderName: faker.lorem.sentence(""),
shippingAddress: faker.lorem.sentence(""),
totalAmount: faker.lorem.sentence(""),
orderStatus: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
