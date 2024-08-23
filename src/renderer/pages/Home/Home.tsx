import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <title>Главная</title>
    </div>
  );
}

export default Home;
