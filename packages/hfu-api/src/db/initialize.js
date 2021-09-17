import { backendApi } from "../constants";

export const initializeData = async () =>
  await fetch(`${backendApi}/initialize`);
