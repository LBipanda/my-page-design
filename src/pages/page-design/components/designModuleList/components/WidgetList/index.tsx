import React from 'react';
import classnames from 'classnames';
import WidgetItem from '../WidgetItem';
import { IWidgetList } from '../../type'

import styles from './index.less';


const WidgetList = React.memo((props: IWidgetList) => {
  const { list } = props;
  return (
    <div className={classnames(styles.wrap)}>
      {list.map(item => {
        return <WidgetItem {...item} />
      })}
    </div>
  );
});

export default WidgetList;