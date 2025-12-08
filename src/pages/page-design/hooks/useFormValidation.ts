import { FormInstance } from 'antd';
import { useEffect } from 'react';

interface UseFormValidationProps {
    form: FormInstance;
    config: any;
    onChange: (values: any) => void;
    onValidateError: (hasError: boolean, errors: Record<string, string>) => void;
}

export const useFormValidation = ({
    form,
    config,
    onChange,
    onValidateError
}: UseFormValidationProps) => {
    // 表单验证逻辑
    const validateForm = async () => {
        try {
            // 触发表单验证
            await form.validateFields();
            // 验证通过
            onValidateError(false, {});
            return false;
        } catch (errorInfo: any) {
            // 验证失败
            const errors: Record<string, string> = {};
            errorInfo.errorFields.forEach((field: any) => {
                errors[field.name.join('.')] = field.errors[0];
            });
            onValidateError(true, errors);
            return true;
        }
    };

    // 监听表单值变化
    const handleValuesChange = (_: Partial<Record<string, any>>, allValues: any) => {
        const hasError = validateForm();
        onChange({
            ...allValues,
            hasError,
        });
    };

    // 组件挂载后执行验证
    useEffect(() => {
        // 使用微任务确保表单初始化完成
        Promise.resolve().then(async () => {
            await validateForm();
            // 重置错误状态，避免显示红色边框
            form.resetFields();
        });
    }, []);

    return {
        validateForm,
        handleValuesChange
    };
};