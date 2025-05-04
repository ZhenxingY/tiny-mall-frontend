import i18n from "./i18n";

/***
 * translate the text base on the i18next resource or pass in resource. The locale information should be stored in the Redux ContextState object.
 * For dynamic resource, we support the parameter resource format such as:
 * Format 1:
 * {
 *    "en": "value",
 *    "zh": "value2"
 * }
 * or Format 2:
 * {
 *    "en": {
 *      "nestedKey1": {"LED":"another one"},
 *      "nestedKey2":{
 *"LED": "Real LED"}
 *    },
 *    "zh": {
 *      "nestedKey2":  "value"
 *    }
 * }
 * @param key: the key we look up in the translation resource. key can be empty string, which means if we pass the resource in format 1, 
 * we will retrieve the value with the locale key directly. The nested key is supported, for example, "key1.key2.key3"
 * @param resource: the translation resource. When empty is passed, we consider that this is an UI label translation and will get the value from i18next resouce. 
 * When the resource is not empty, we consider that the translation is for the dynamic data and retrieve the value from resrouce
 */
export default function translate(key:string, resource: any = null): string{

  // no resource - UI transation via i18next
  if(resource == null || resource == undefined || resource ===""){
    if(key){
      const value = i18n.t(key);
      // not match, return the key
      return value;
    }else{
      return "";
    }
  }

  // translate from resource
  // const language = store.getState().context.language;
  // TODO remove
  const language = "zh_CN";

  let resourceObject:Object = {};
  
  if(typeof(resource) == 'string'){
    resourceObject = JSON.parse(resource);
  }else if(typeof(resource) == 'object'){
    resourceObject = resource;
  }

  if(resourceObject && resourceObject.hasOwnProperty(language)){
    let valueObject:Object = resourceObject[language as keyof typeof resourceObject];
    if(!valueObject){
      return "";
    }
    if(!key){
      return valueObject.toString();
    }
    const keys = key.split(".");
    const keyLevel = keys.length;
    let keyIndex = 0;
    while(keyIndex < keyLevel){
      const currentKey = keys[keyIndex];
      if(valueObject.hasOwnProperty(currentKey)){
        valueObject = valueObject[currentKey as keyof typeof valueObject];
        keyIndex++;
      }else{
        break;
      }
    }
    if(keyIndex == keyLevel) return valueObject.toString();
    return key;
  }

  return "";

}