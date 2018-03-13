import { AbstractLocalev2 } from '../util/Locale';

const ENGLISH_ABOUT = "About";

class SampleLocale extends AbstractLocalev2 {
  private lang:LocaleFormatv2 = {
    "about": {
      en: ENGLISH_ABOUT,
      my: 'Kenal'
    }
  }

  public getData():LocaleFormatv2 {
    return this.lang;
  }
}

test('Test default locale', () => {
  const sampleLocale = new SampleLocale();
  expect(sampleLocale.translate("about")).toBe(ENGLISH_ABOUT);
});
