import { Link } from 'react-router-dom';

export default function NewPage() {
  return (
    <div>
      <h1>This is a New Page</h1>
      <Link to="/">
        <button type="button">Go back</button>
      </Link>
    </div>
  );
}
