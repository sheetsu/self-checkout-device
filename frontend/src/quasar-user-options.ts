import { Dialog, Notify, Loading, setCssVar, Quasar } from "quasar";
import "quasar/dist/quasar.sass";
import iconSet from "quasar/icon-set/fontawesome-v5.js";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";

import(`quasar/lang/pl`).then((lang) => Quasar.lang.set(lang.default));

setCssVar("primary", "#FFAB00");
setCssVar("dark", "#2D2D53");
setCssVar("dark-200", "#8b8bc1");
setCssVar("secondary", "#dbeaff");
setCssVar("positive", "#34800E");
setCssVar("negative", "#CC0C36");
setCssVar("info", "#295CE1");
setCssVar("warning", "#E85F29");
setCssVar("accent", "#D0D4DA");

// Notify.registerType("custom-positive", {
//   classes: "notify-custom notify-custom--is-positive",
//   avatar: require("@/assets/svg/positive-notification.svg"),
// });
//
// Notify.registerType("custom-warning", {
//   classes: "notify-custom notify-custom--is-warning",
//   avatar: require("@/assets/svg/warning-notification.svg"),
// });
//
// Notify.registerType("custom-negative", {
//   classes: "notify-custom notify-custom--is-negative",
//   avatar: require("@/assets/svg/negative-notification.svg"),
// });
//
// Notify.registerType("custom-info", {
//   classes: "notify-custom notify-custom--is-info",
//   avatar: require("@/assets/svg/info-notification.svg"),
// });
//
// Notify.registerType("custom-help", {
//   classes: "notify-custom notify-custom--is-help",
//   avatar: require("@/assets/svg/help-notification.svg"),
// });

export default {
  plugins: {
    Dialog,
    Notify,
    Loading,
  },
  iconSet,
};
