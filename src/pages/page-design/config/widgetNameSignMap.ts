import { DragableSignModule } from '../type';

const nameMap: Map<DragableSignModule, string> = new Map();

nameMap.set(DragableSignModule.SeparatorModule, '分隔符');

export const moduleNameMap = (sign: DragableSignModule): string => {
  console.log('moduleNameMap========sign====', sign, nameMap.get(sign));
  return nameMap.get(sign) || '未知模块';
};
