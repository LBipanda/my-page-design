import { ConfigTypes, ModuleDesignViewProps } from '@/interfaces/models/design/designModule';
import React, { useMemo } from 'react';

import { genRGBAStyleString } from '@/pages/store/pageDesign/edit/components/widgetConfigEdit/components/colorPIckerButton/utils';

/** 改名，将`Demo`部分改为你的名字 */
export const Demo: React.FC<ModuleDesignViewProps<ConfigTypes.dragableSign.demo>> = React.memo(
  function Demo(props) {
    const { style, content } = props.moduleConfig;

    const titleStyle: React.CSSProperties = useMemo(() => {
      return { color: genRGBAStyleString(style.color) };
    }, [style.color]);

    return (
      <div style={titleStyle}>
        <div>我是预览：{content.title.en}</div>
        <div>我是预览：{content.title.cn}</div>
      </div>
    );
  },
);
