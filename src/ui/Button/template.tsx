export function Button({ label, onClick, children }: any) {
  return (
    <button type="button" onClick={onClick}>
      {label}
      {children}
    </button>
  );
}
