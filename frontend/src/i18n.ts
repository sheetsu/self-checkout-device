import { createI18n, LocaleMessages, VueMessageType } from "vue-i18n";

function loadLocaleMessages(): any {
  const locales = require.context("./locales", true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages: LocaleMessages<VueMessageType> = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: process.env.VUE_APP_I18N_LOCALE || "pl",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "pl",
  messages: loadLocaleMessages(),
});

export const locales = [
  { label: "Polski", value: "polish", shortcut: "pl" },
  { label: "English", value: "english", shortcut: "en" },
  { label: "Українська", value: "ukrainian", shortcut: "uk" },
  { label: "Čeština", value: "czech", shortcut: "cs" },
] as const;

export type localesIcons = (typeof locales)[number]["shortcut"];
export type localesInterface = (typeof locales)[number];
