import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/room";
import { RootState } from "../../types";

const roomDomain = (state: RootState) => state.rooms || initialState;

export const selectRooms = createSelector(roomDomain, state => state);
export const selectRoom = createSelector(roomDomain, state => state.Room);
