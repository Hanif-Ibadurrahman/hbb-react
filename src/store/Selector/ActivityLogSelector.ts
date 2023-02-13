import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/activityLog";
import { RootState } from "../../types";

const activityLogDomain = (state: RootState) =>
	state.activityLogs || initialState;

export const selectActivityLogs = createSelector(
	activityLogDomain,
	state => state,
);

export const selectActivityLog = createSelector(
	activityLogDomain,
	state => state.ActivityLog,
);

export const selectActivityLogsArchiver = createSelector(
	activityLogDomain,
	state => state.ActivityLogsArchiver,
);

export const selectDashboardSummary = createSelector(
	activityLogDomain,
	state => state.DashboardSummary,
);
