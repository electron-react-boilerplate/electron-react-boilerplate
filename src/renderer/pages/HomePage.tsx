import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <div className="Hello">
        <Link to="/newpage">
          <button type="button">Go to New Page</button>
        </Link>
      </div>
    </div>
  );
}
