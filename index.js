const {
  EMAIL, API_KEY, ZONE_ID, NAME,
} = process.env;

const isIp = (s) => /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(s);

const getTopIp = async () => {
  const ip = [];
  const response = await fetch('https://vps789.com/public/sum/cfIpTop20');
  const data = await response.json();
  data.data.good.forEach((good) => {
    if (isIp(good.ip)) {
      ip.push(good.ip);
    }
  });
  return ip;
};

const base = `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`;
const headers = {
  'X-Auth-Email': EMAIL,
  'X-Auth-Key': API_KEY,
};

const getARecord = async () => {
  const response = await fetch(`${base}?name=${NAME}&type=A`, {
    headers,
  });
  const data = await response.json();
  return data.result;
};

const deleteARecord = async (record) => {
  await fetch(`${base}/${record.id}`, {
    method: 'DELETE',
    headers,
  });
};

const postARecord = async (content) => {
  await fetch(base, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      content,
      name: NAME,
      type: 'A',
    }),
  });
};

(async () => {
  const ip = await getTopIp();
  const record = await getARecord();
  await Promise.all(record.map(deleteARecord));
  await Promise.all(ip.map(postARecord));
})();
