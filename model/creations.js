import { genCreation } from './creation';

export function getCreationList(baseID = 0, length = 10) {
  return new Array(length).fill(0).map((_, idx) => genCreation(idx + baseID));
}

export const taskList = getCreationList();
