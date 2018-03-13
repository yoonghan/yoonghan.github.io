import { UtilLocale } from "../util/UtilLocale";

test('locale_in_href', () => {
  const MY_LANG = "my";
  const EN_LANG = "en";
  const WINDOW_PATH = "http://sampleaddress/";
  expect(UtilLocale.getLocalizedHref("http://sampleaddress", WINDOW_PATH)).toBe("http://sampleaddress");
  expect(UtilLocale.getLocalizedHref("https://sampleaddress", WINDOW_PATH)).toBe("https://sampleaddress");
  expect(UtilLocale.getLocalizedHref("//sampleaddress", WINDOW_PATH)).toBe("//sampleaddress");
  expect(UtilLocale.getLocalizedHref("sampleaddress", WINDOW_PATH)).toBe("sampleaddress");

  const LANG_WINDOW_PATH = WINDOW_PATH + MY_LANG + "/path";
  expect(UtilLocale.getLocalizedHref("http://sampleaddress", LANG_WINDOW_PATH)).toBe("http://sampleaddress");
  expect(UtilLocale.getLocalizedHref("//sampleaddress", LANG_WINDOW_PATH)).toBe("//sampleaddress");
  expect(UtilLocale.getLocalizedHref("sampleaddress", LANG_WINDOW_PATH)).toBe("/" + MY_LANG + "/sampleaddress");

  const DEFAULT_LANG_WINDOW_PATH = WINDOW_PATH + EN_LANG + "/path";
  expect(UtilLocale.getLocalizedHref("http://sampleaddress", DEFAULT_LANG_WINDOW_PATH)).toBe("http://sampleaddress");
  expect(UtilLocale.getLocalizedHref("//sampleaddress", DEFAULT_LANG_WINDOW_PATH)).toBe("//sampleaddress");
  expect(UtilLocale.getLocalizedHref("sampleaddress", DEFAULT_LANG_WINDOW_PATH)).toBe("sampleaddress");
});

test('language_in_path', () => {
  const NORMAL_PATH = "http://sampleaddress/";
  const MY_PATH = "https://sampleaddress/my/here";
  const EN_PATH = "https://sampleaddress/en/nothere";

  expect(UtilLocale.extractLanguageFromPath(NORMAL_PATH)).toBe(UtilLocale.defaultLang);
  expect(UtilLocale.extractLanguageFromPath(MY_PATH)).toBe("my");
  expect(UtilLocale.extractLanguageFromPath(EN_PATH)).toBe("en");
});

test('redirect_browser', () => {
  const NORMAL_PATH = "/sampleaddress";
  const MY_PATH = "/my/here";

  expect(UtilLocale.redirectBrowser("my", NORMAL_PATH)).toBe("/my" + NORMAL_PATH);
  expect(UtilLocale.redirectBrowser("my", MY_PATH)).toBe(MY_PATH);
})
