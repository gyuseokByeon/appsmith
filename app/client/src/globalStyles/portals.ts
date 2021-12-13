import { createGlobalStyle } from "styled-components";
import { Layers } from "constants/Layers";
import { Classes } from "@blueprintjs/core";
import { Colors } from "constants/Colors";

export const replayHighlightClass = "ur--has-border";

export const PortalStyles = createGlobalStyle`
  #header-root {
    position: relative;
    z-index: ${Layers.header};
  }
  
  #tooltip-root {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: ${Layers.max};
  }

  .bp3-portal {
    z-index: ${Layers.portals};
  }

  .file-picker-dialog.bp3-dialog .${Classes.DIALOG_BODY} {
    padding: 0;
  }

  .bp3-portal.inline-comment-thread {
    z-index: ${Layers.appComments};
  }

  .bp3-portal.guided-tour-indicator-portal {
    pointer-events: none;
  }

  .flash .${replayHighlightClass} {
    border-color: ${Colors.WARNING_SOLID} !important;
    box-shadow: 0px 0px 4px 0.5px rgba(254, 184, 17, 0.7) !important;

    & > input, .CodeMirror, .appsmith-select__control {
      border-color: ${Colors.WARNING_SOLID} !important;
      box-shadow: 0px 0px 4px 0.5px rgba(254, 184, 17, 0.7) !important;
    }
  }

  .guided-tour-border {
    position:fixed;
    border: 4px solid rgba(191, 65, 9, 0);
    border-radius: 4px;
    filter: drop-shadow(0px 1px 3px rgba(16, 24, 40, 0.1)) drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.06));
    transition: border-color 1s linear;
    z-index: 3;
  }

  .show {
    border-color: rgba(191, 65, 9, 1);
  }
`;
