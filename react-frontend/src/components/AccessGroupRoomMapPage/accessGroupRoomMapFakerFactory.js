
import { faker } from "@faker-js/faker";
export default (user,count,accessGroupIDIds,roomIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
accessGroupID: accessGroupIDIds[i % accessGroupIDIds.length],
roomID: roomIDIds[i % roomIDIds.length],
isGrantedAccess: faker.datatype.boolean(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
