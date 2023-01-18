import axios from 'axios';

async function getInformation() {
  const req = await axios.get(
    'https://www.exploit-db.com/search?q=HTTPD&platform=linux&port=80',
    {
      headers: {
        'user-agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
      },
    }
  );
  console.log(req.data);
}

getInformation();
