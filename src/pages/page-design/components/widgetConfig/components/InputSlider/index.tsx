import { InputNumber, Slider } from 'antd';

interface ISliderProps {
  options?: any;
  value?: number;
  onChange?: (value: number | null) => void;
}

const InputSlider: React.FC<ISliderProps> = ({ options = { min: 0, max: 50 }, value, onChange }) => {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <Slider
      {...options}
      value={value}
      onChange={onChange}
      style={{ flex: 1 }}
    />
    <InputNumber
      {...options}
      value={value}
      onChange={onChange}
      style={{ width: 80 }}
    />
  </div>
};

export default InputSlider;