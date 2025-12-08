// import * as DesignModule from '@/interfaces/models/design/designModule';
import { DragableSignModule } from '../../../type';

import React, { useMemo } from 'react';

import styles from './index.less';

// export const Separator: React.FC<DesignModule.ModuleDesignViewProps<
//   DesignModule.ConfigTypes.dragableSign.blankModule
// >> = React.memo(function Separator(props) {
export const Separator: React.FC = React.memo(function Separator(props) {
  return <EmptySeparator {...props} />;
});

// const EmptySeparator: React.FC<DesignModule.ModuleDesignViewProps<
//   DesignModule.ConfigTypes.dragableSign.blankModule
// >> = React.memo(function EmptySeparator(props) {
const EmptySeparator: React.FC = React.memo(function EmptySeparator(props: any) {
  const { style } = props.moduleConfig.formConfig;
  const blockStyle = useMemo<React.CSSProperties>(() => {
    return {
      height: `${style.height}px`,
    };
  }, [style.height]);
  return (
    <div className={styles.wrap} style={{ marginBottom: `${style.marginBottom}px` }}>
      <div className={styles.block} style={blockStyle} />
    </div>
  );
});
