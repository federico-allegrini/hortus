import { integer, relationship, select, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export default list({
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    width: integer(),
    height: integer(),
    type: select({
      options: [
        { label: "Ground", value: "GROUND" },
        { label: "Raised Bed", value: "RAISED_BED" },
        { label: "Pot", value: "POT" },
        { label: "Planter", value: "PLANTER" },
        { label: "Box", value: "BOX" },
        { label: "Walkway", value: "WALKWAY" },
      ],
      defaultValue: "GROUND",
      ui: {
        displayMode: "segmented-control",
      },
    }),
    cultivationArea: relationship({
      ref: "CultivationArea.cultivationPlot",
      ui: {
        displayMode: "select",
        hideCreate: true,
      },
    }),
  },
});
