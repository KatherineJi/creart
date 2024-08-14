import { genTask } from './task';

export function getTaskList(baseID = 0, length = 10) {
  return new Array(length).fill(0).map((_, idx) => genTask(idx + baseID));
}

export const taskList = getTaskList();
