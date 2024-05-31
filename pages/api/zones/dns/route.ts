import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { apiKey, zoneId } = req.body;
  
  if (!apiKey || !zoneId) {
    return res.status(400).json({ message: 'API key and Zone ID are required' });
  }

  const apiUrl = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    }
  };

  const dnsRecords = [
    {
        type: 'MX',
        name: 'yourdomain.com', // Replace with your actual domain name
        content: 'ASPMX.L.GOOGLE.COM',
        priority: 1,
        ttl: 3600,
        proxied: false
    },
    {
        type: 'MX',
        name: 'yourdomain.com', // Replace with your actual domain name
        content: 'ALT1.ASPMX.L.GOOGLE.COM',
        priority: 5,
        ttl: 3600,
        proxied: false
    },
    {
        type: 'MX',
        name: 'yourdomain.com', // Replace with your actual domain name
        content: 'ALT2.ASPMX.L.GOOGLE.COM',
        priority: 5,
        ttl: 3600,
        proxied: false
    },
    {
        type: 'MX',
        name: 'yourdomain.com', // Replace with your actual domain name
        content: 'ALT3.ASPMX.L.GOOGLE.COM',
        priority: 10,
        ttl: 3600,
        proxied: false
    },
    {
        type: 'MX',
        name: 'yourdomain.com', // Replace with your actual domain name
        content: 'ALT4.ASPMX.L.GOOGLE.COM',
        priority: 10,
        ttl: 3600,
        proxied: false
    },
    {
        type: 'TXT',
        name: 'yourdomain.com', // Replace with your actual domain name
        content: 'v=spf1 include:_spf.google.com ~all',
        ttl: 3600,
        proxied: false
    },
    {
        type: 'TXT',
        name: '_dmarc.yourdomain.com', // Replace with your actual domain name
        content: 'v=DMARC1; p=quarantine; sp=quarantine; adkim=s; aspf=s; rua=mailto:aggregate@seonss.com; ruf=mailto:dmarc@seonss.com; rf=afrf; pct=100; ri=86400',
        ttl: 3600,
        proxied: false
    },
    {
        type: 'TXT',
        name: 'dkim._domainkey.yourdomain.com', // Replace with your actual domain name
        content: 'v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAozgjXw08gN7I4FcrYCDaJW/TLhw8wlPXlrKaJdF1OeH9jos62g7x8ZSQj85tmFOGYKeqIbiLpwyKBe9tMY2KxftMBuPUFJlZbu93OujQBP6BzC7oBx3+cCHaP3WQ4gXtILGGbwT+MQl2k456F7JYnK2lQNgvPsN7QxPY+ONakcECbIszijxnK1efGIk7/eHDNZnF3eqIQXVvatFXB0aITZdADyZDmJXf1IGYso4XjhoQd7NbD2RhpcWJrIQJxcTDLU05GHchJb+HZ6YaFcT5ZP1V6IAhpnN4WrpJmq/wlff5gBFoGXWFE1RqxpSqLE4eEuxbBehJiILEGyn61qjxmQIDAQAB',
        ttl: 3600,
        proxied: false
    },
    {
        type: 'CNAME',
        name: 'inst.yourdomain.com', // Replace with your actual domain name
        content: 'prox.itrackly.com',
        ttl: 3600,
        proxied: false
    }
];



  try {
    for (let record of dnsRecords) {
      await axios.post(apiUrl, record, config);
      console.log(`DNS Record created successfully for ${record.name}`);
    }
    res.status(200).json({ message: 'DNS records created successfully.' });
  } catch (error) {
    console.error('Error creating DNS records:', error);
    if (error) {
      console.error('Response data:', error);
      res.status(500).json({ message: error });
    } else {
      res.status(500).json({ message: error });
    }
  }
};

export default handler;
