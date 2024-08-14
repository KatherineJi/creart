import { genTemplate } from './template';

export function getTemplateList(baseID = 0, length = 10) {
  return new Array(length).fill(0).map((_, idx) => genTemplate(idx + baseID));
}

export const templateList = getTemplateList();
