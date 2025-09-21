const http = require('http');

function testAPI() {
  console.log('Testing API endpoints...');
  
  // Test health endpoint
  const healthReq = http.get('http://localhost:5001/health', (res) => {
    console.log('Health status:', res.statusCode);
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Health response:', data);
      
      // Test visas endpoint
      const visasReq = http.get('http://localhost:5001/api/visas', (res) => {
        console.log('Visas status:', res.statusCode);
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            console.log('Visas data length:', parsed.data ? parsed.data.length : 'No data');
            if (parsed.data && parsed.data.length > 0) {
              console.log('First visa country:', parsed.data[0].country);
            }
          } catch (e) {
            console.log('Raw response:', data);
          }
        });
      });
      
      visasReq.on('error', (err) => {
        console.error('Visas request error:', err.message);
      });
    });
  });
  
  healthReq.on('error', (err) => {
    console.error('Health request error:', err.message);
  });
}

testAPI();