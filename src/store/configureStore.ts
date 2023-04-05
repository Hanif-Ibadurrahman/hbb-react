import {
	configureStore,
	getDefaultMiddleware,
	StoreEnhancer,
} from "@reduxjs/toolkit";
import { createInjectorsEnhancer } from "redux-injectors";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { createReducer } from "./reducers";

export function configureAppStore() {
	const reduxSagaMonitorOptions = {};
	const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
	const { run: runSaga } = sagaMiddleware;

	// Create the store with saga middleware
	const middlewares = [sagaMiddleware, thunk];
	// const middlewares = [sagaMiddleware];

	const enhancers = [
		createInjectorsEnhancer({
			createReducer,
			runSaga,
		}),
	] as StoreEnhancer[];

	const store = configureStore({
		reducer: createReducer(),

		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: false,
			}),

		// middleware: ()[...getDefaultMiddleware({
		// 	thunk
		// })],
		devTools:
			/* istanbul ignore next line */
			process.env.NODE_ENV !== "production" ||
			process.env.PUBLIC_URL.length > 0,
		enhancers,
	});

	return store;
}
