import * as Factory from "factory.ts";
import { generateReactKey } from "utils/generators";
import { WidgetProps } from "widgets/BaseWidgetConstants";

export const VideoFactory = Factory.Sync.makeFactory<WidgetProps>({
  isVisible: true,
  url: "https://www.youtube.com/watch?v=mzqK0QIZRLs",
  autoPlay: false,
  type: "VIDEO_WIDGET",
  isLoading: false,
  parentColumnSpace: 74,
  parentRowSpace: 40,
  leftColumn: 1,
  rightColumn: 8,
  topRow: 17,
  bottomRow: 24,
  parentId: "0",
  dynamicBindingPathList: [],
  widgetName: Factory.each((i) => `Video${i + 1}`),
  widgetId: generateReactKey(),
  renderMode: "CANVAS",
  version: 1,
});
