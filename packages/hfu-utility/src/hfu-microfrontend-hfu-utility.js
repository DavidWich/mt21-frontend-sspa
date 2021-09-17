import { BehaviorSubject } from "rxjs";
import i18next from "./i18n";

export const language = new BehaviorSubject("en");

export { store } from "./redux/index";
export { authActions } from "./redux/auth-slice";
export { cartActions } from "./redux/cart-slice";
export { i18next };
