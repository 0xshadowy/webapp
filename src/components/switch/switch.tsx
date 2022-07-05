type ViewChoice = 'account' | 'organizations';

type SwitchProps = {
  choice: ViewChoice;
  setChoice: (val: ViewChoice) => void;
};

export const Switch = ({ choice, setChoice }: SwitchProps) => {
  return (
    <div className="btn-group">
      <button
        className={`btn btn-xs normal-case ${choice === 'account' ? 'btn-active' : ''}`}
        onClick={() => setChoice('account')}
      >
        Account
      </button>
      <button
        className={`btn btn-xs normal-case ${choice === 'organizations' ? 'btn-active' : ''}`}
        onClick={() => setChoice('organizations')}
      >
        Organizations
      </button>
    </div>
  );
};

export default Switch;
