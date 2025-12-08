import React, { useState } from 'react';
import FormRender, { useSimpleForm } from '@/components/FormRender';
import styles from './pageConfig.less';
export default function Demo() {

  const widgetList = [
    {
      label: "页面名称",
      name: 'pageName',
      rules: [{ required: true, message: '请输入页面名称' }],
      type: 'Input',
      props: {}
    },
    {
      label: "页面标题",
      name: 'pageName',
      rules: [{ required: true, message: '请输入页面标题' }],
      type: 'Input',
      props: {}
    },
  ]

  const form = useSimpleForm();
  const [formRes, setFormRes] = useState<any>({});
  // const formrender = useSimpleFormRender();

  const onSubmit = async (e: any) => {
    e?.preventDefault?.();
    const result = await form.validate();
    console.log(result, 'result');
    setFormRes(result);
  };

  return (
    <div className={styles['pageConfig-wrap']}>
      <FormRender
        form={form}
        widgetList={widgetList}
      />
      {/* <div style={{ marginLeft: '120px' }}>
        <Button onClick={onSubmit}>submit</Button>
      </div> */}
    </div>
  );
}