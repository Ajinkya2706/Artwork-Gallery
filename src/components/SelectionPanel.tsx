import { useState, useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

interface Props {
  onSubmit: (count: number) => void;
}

export const SelectionPanel = ({ onSubmit }: Props) => {
  const [count, setCount] = useState('');
  const op = useRef<OverlayPanel>(null);

  const handleSubmit = () => {
    const num = parseInt(count);
    if (num > 0) {
      onSubmit(num);
      setCount('');
      op.current?.hide();
    }
  };

  return (
    <>
      <i 
        className="pi pi-chevron-down" 
        style={{ cursor: 'pointer', marginLeft: '8px' }}
        onClick={(e) => op.current?.toggle(e)}
      />
      <OverlayPanel ref={op}>
        <div style={{ padding: '1rem' }}>
          <label>Select rows:</label>
          <InputText 
            value={count}
            onChange={(e) => setCount(e.target.value)}
            type="number"
            placeholder="Enter count"
            style={{ display: 'block', marginTop: '0.5rem', width: '100%' }}
          />
          <Button 
            label="Submit"
            onClick={handleSubmit}
            style={{ marginTop: '0.5rem', width: '100%' }}
          />
        </div>
      </OverlayPanel>
    </>
  );
};