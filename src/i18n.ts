import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

// language import
import HomePageEN from './lang/en/translation.json';
import HomePagebMy from './lang/my/translation.json';

const resources = {
    en: {
        translation: HomePageEN
    },
    my: {
        translation: HomePagebMy
    }

};

export const langSupports = ['en', 'my'];
export const langDefault = 'my';

export const getLanguage = () => {
    let storageLanguage = sessionStorage.getItem('selectedLanguage') ?? "";
    if (langSupports.includes(storageLanguage)) {
        return storageLanguage;
    }

    return langDefault;
};

export const changeLanguage = (language: string) => {
    sessionStorage.setItem('selectedLanguage', language);
    i18n.changeLanguage(language);
};

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: langDefault,
        debug: true,
        interpolation: {
            escapeValue: false
        },
        lng: getLanguage()
    });

export {
    resources
}
export default i18n;