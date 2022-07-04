import { checkbox, integer, relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export default list({
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    active: checkbox({
      defaultValue: true,
      ui: {
        createView: { fieldMode: "hidden" },
      },
    }),
    width: integer(),
    height: integer(),
    user: relationship({
      ref: "User.cultivationArea",
      ui: {
        displayMode: "select",
        hideCreate: true,
      },
    }),
    photos: relationship({
      ref: "CultivationAreaImage.cultivationArea",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] },
      },
    }),
    cultivationPlot: relationship({
      ref: "CultivationPlot.cultivationArea",
      many: true,
    }),
  },
});
