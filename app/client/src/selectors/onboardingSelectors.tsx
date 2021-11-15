import {
  isPermitted,
  PERMISSION_TYPE,
} from "pages/Applications/permissionHelpers";
import { AppState } from "reducers";
import { createSelector } from "reselect";
import { getUserApplicationsOrgs } from "./applicationSelectors";
import { isEqual } from "lodash";
import { getWidgetById, getWidgets } from "sagas/selectors";
import { getActions } from "./entitiesSelector";
import { PluginType } from "entities/Action";
import { getActionById } from "./editorSelectors";

// Signposting selectors
export const getEnableFirstTimeUserOnboarding = (state: AppState) => {
  return state.ui.onBoarding.enableFirstTimeUserOnboarding;
};

export const getFirstTimeUserOnboardingApplicationId = (state: AppState) => {
  return state.ui.onBoarding.firstTimeUserOnboardingApplicationId;
};

export const getFirstTimeUserOnboardingComplete = (state: AppState) => {
  return state.ui.onBoarding.firstTimeUserOnboardingComplete;
};

export const getFirstTimeUserOnboardingModal = (state: AppState) =>
  state.ui.onBoarding.showFirstTimeUserOnboardingModal;

export const getIsFirstTimeUserOnboardingEnabled = createSelector(
  (state: AppState) => state.entities.pageList.applicationId,
  getEnableFirstTimeUserOnboarding,
  getFirstTimeUserOnboardingApplicationId,
  (currentApplicationId, enabled, applicationId) => {
    return enabled && currentApplicationId === applicationId;
  },
);

export const getInOnboardingWidgetSelection = (state: AppState) =>
  state.ui.onBoarding.inOnboardingWidgetSelection;

// Guided Tour selectors

export const isExploring = (state: AppState) => state.ui.onBoarding.exploring;
export const inGuidedTour = (state: AppState) => state.ui.onBoarding.guidedTour;
export const getGuidedTourTableWidget = (state: AppState) =>
  state.ui.onBoarding.tableWidgetId;
export const getGuidedTourQuery = (state: AppState) =>
  state.ui.onBoarding.queryId;

export const getQueryName = (state: AppState) => {
  const queryId = getGuidedTourQuery(state);
  const actions = getActions(state);
  const query = actions.find((action) => action.config.id === queryId);

  if (query?.config.name) return query?.config.name;
  return "";
};

export const getTableWidget = createSelector(
  getWidgets,
  getGuidedTourTableWidget,
  (widgets, guidedTourTableWidgetId) => {
    const tableWidget = widgets[guidedTourTableWidgetId];

    if (!tableWidget) {
      return Object.values(widgets).find(
        (widget) => widget.type === "TABLE_WIDGET",
      );
    } else {
      return tableWidget;
    }
  },
);

export const getGuidedTourDatasource = (state: AppState) => {
  const datasources = state.entities.datasources;
  const dbConfig = {
    connection: {
      mode: "READ_WRITE",
      ssl: {
        authType: "DEFAULT",
      },
    },
    endpoints: [
      {
        host: "fake-api.cvuydmurdlas.us-east-1.rds.amazonaws.com",
      },
    ],
    authentication: {
      authenticationType: "dbAuth",
      username: "users",
      databaseName: "users",
    },
  };
  const datasource = datasources.list.find((datasource) =>
    isEqual(datasource.datasourceConfiguration, dbConfig),
  );

  return datasource;
};

export const getQueryAction = createSelector(
  getActions,
  getGuidedTourQuery,
  getGuidedTourDatasource,
  (actions, guidedTourQueryId, datasource) => {
    const query = actions.find(
      (action) => action.config.id === guidedTourQueryId,
    );

    if (!query) {
      return actions.find((action) => {
        return (
          action.config.pluginType === PluginType.DB &&
          action.config.datasource?.id === datasource?.id
        );
      });
    } else {
      return query;
    }
  },
);

export const loading = (state: AppState) => state.ui.onBoarding.loading;

// To find an organisation where the user as permission to create an
// application
export const getOnboardingOrganisations = createSelector(
  getUserApplicationsOrgs,
  (userOrgs) => {
    return userOrgs.filter((userOrg) =>
      isPermitted(
        userOrg.organization.userPermissions || [],
        PERMISSION_TYPE.CREATE_APPLICATION,
      ),
    );
  },
);
