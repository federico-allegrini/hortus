import { list } from "@keystone-next/keystone/schema";
import { text, password } from "@keystone-next/fields";

export default list({
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
  },
});
