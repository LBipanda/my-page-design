import * as DesignModule from '@/interfaces/models/design/designModule';

import React, { useMemo } from 'react';
import { ConfigPanelProps } from '@/pages/store/pageDesign/edit/components/typs';
import {
  fallbackColorBase,
  genRGBAStyleString,
} from '@/pages/store/pageDesign/edit/components/widgetConfigEdit/components/colorPIckerButton/utils';

/** 这个函数需要返回一个对象，用于初始化 */

/** 将`Demo`部分改为你的名字, 类型需要先定义 */
export const DemoConfigConstructor = (
  baseConfig: DesignModule.ModuleBaseConfig,
): DesignModule.Demo.Config => {
  return {
    ...baseConfig,
    moduleSign: DesignModule.dragableSign.demo,
    style: {
      color: fallbackColorBase,
      marginBottom: 0,
    },
    content: {
      title: {
        en: 'english',
        cn: '中文',
      },
    },
    hasError: false,
    moduleType: DesignModule.ConfigTypes.ModuleType.Normal,
  };
};

interface Props extends ConfigPanelProps<DesignModule.Demo.Config> {}
export const DemoEdit: React.FC<Props> = React.memo(function DemoEdit({ config, onChange }) {
  const { style, content } = config;

  const titleStyle: React.CSSProperties = useMemo(() => {
    return { color: genRGBAStyleString(style.color) };
  }, [style.color]);

  return (
    <div>
      <div>hello {content.title.en}</div>
      <div>你好， {content.title.cn}</div>
    </div>
  );
});
