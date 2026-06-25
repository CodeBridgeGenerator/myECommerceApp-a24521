
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
productId: faker.lorem.sentence(1),
title: faker.lorem.sentence(1),
description: faker.lorem.sentence(1),
price: faker.lorem.sentence(1),
productImage: faker.lorem.sentence(1),
stockQuantity: faker.lorem.sentence(1),
color: faker.lorem.sentence(1),
size: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
