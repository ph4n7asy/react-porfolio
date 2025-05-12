import { DefaultTheme } from 'styled-components';

export interface Theme {
  bg: string;
  bgLight: string;
  primary: string;
  text_primary: string;
  text_secondary: string;
  card: string;
  card_light?: string;
  button: string;
  white?: string;
  black?: string;
}
export const darkTheme: Theme & DefaultTheme = {
  bg: "#090917",
  bgLight: "#1C1E27",
  primary: "#8800ff",
  text_primary: "#F2F3F4",
  text_secondary: "#b1b2b3",
  card: "#171721",
  card_light: "#191924",
  button: "#8800ff",
  white: "#FFFFFF",
  black: "#000000",
};