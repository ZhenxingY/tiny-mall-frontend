import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import * as zhValue from "./translation/zh_CN.json";
import * as enValue from "./translation/en_US.json";
 
i18n
 .use(initReactI18next)
 .init({
   resources: {
     en_US: {
      translation: enValue
     },
     zh_CN: {
       translation: zhValue
     }
   }
 });

i18n.changeLanguage("zh_CN");

export default i18n;