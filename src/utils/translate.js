const BG = 'bg';
const EN = 'en';

export const LANGUAGES = {
  BG,
  EN
};

/**
 * Translates form english to bulgarian
 */
export const t = (en, bg) => {
  if (getCurrentLanguage() === BG) {
    return bg;
  }
  return en;
};

export const setLanguageEn = () => {
  window.localStorage.setItem('lang', EN);
};

export const setLanguageBg = () => {
  window.localStorage.setItem('lang', BG);
};

export const getCurrentLanguage = () => {
  if (!window.localStorage.getItem('lang')) {
    return LANGUAGES.EN;
  }
  return window.localStorage.getItem('lang');
};
