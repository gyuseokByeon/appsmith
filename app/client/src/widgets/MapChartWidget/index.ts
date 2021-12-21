import Widget from "./widget";
import IconSVG from "./icon.svg";
import { GRID_DENSITY_MIGRATION_V1 } from "widgets/constants";
import { dataSetForWorld, MapTypes } from "./constants";

export const CONFIG = {
  type: Widget.getWidgetType(),
  name: "Map Chart", // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
  iconSVG: IconSVG,
  needsMeta: true, // Defines if this widget adds any meta properties
  isCanvas: false, // Defines if this widget has a canvas within in which we can drop other widgets
  defaults: {
    rows: 8 * GRID_DENSITY_MIGRATION_V1,
    columns: 6 * GRID_DENSITY_MIGRATION_V1,
    widgetName: "MapChart",
    version: 1,
    mapType: MapTypes.WORLD,
    mapTitle: "Global Population",
    showLabels: true,
    data: dataSetForWorld,
    colorRange: [
      {
        minValue: 0.5,
        maxValue: 1.0,
        code: "#FFD74D",
      },
      {
        minValue: 1.0,
        maxValue: 2.0,
        code: "#FB8C00",
      },
      {
        minValue: 2.0,
        maxValue: 3.0,
        code: "#E65100",
      },
    ],
  },
  properties: {
    derived: Widget.getDerivedPropertiesMap(),
    default: Widget.getDefaultPropertiesMap(),
    meta: Widget.getMetaPropertiesMap(),
    config: Widget.getPropertyPaneConfig(),
  },
};

export default Widget;