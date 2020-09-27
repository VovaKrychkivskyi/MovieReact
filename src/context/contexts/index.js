import React, {createContext} from "react";

export const isDarkTheme = false;
export const DarkThemeContext = createContext(isDarkTheme);

export const ViewPortContext = createContext();