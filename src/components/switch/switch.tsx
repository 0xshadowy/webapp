type SwitchProps = {
  active: number;
  setActive: (val: number) => void;
};

export const Switch = ({ active, setActive }: SwitchProps) => {
  return (
    <div className="btn-group">
      <button
        className={`btn btn-xs normal-case ${active === 0 ? 'btn-active' : ''}`}
        onClick={() => setActive(0)}
      >
        Imported
      </button>
      <button
        className={`btn btn-xs normal-case ${active === 1 ? 'btn-active' : ''}`}
        onClick={() => setActive(1)}
      >
        Not imported
      </button>
    </div>
  );
};

export default Switch;
