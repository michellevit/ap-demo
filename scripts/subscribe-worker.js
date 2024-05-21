// Note: This script has no direct functionality within this application, it is only meant as a reference to be used for the Cloudflare Worker code (i.e. subscribe-worker)

async function handleRequest(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    // Handle CORS preflight request
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  if (request.method === 'POST') {
    const { email, firstName } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
      },
    };

    const API_KEY = env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = env.MAILCHIMP_AUDIENCE_ID;
    const DATACENTER = API_KEY.split('-')[1];
    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

    const response = await fetch(url, {
      body: JSON.stringify(data),
      headers: {
        Authorization: `apikey ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (response.status >= 400) {
      return new Response(JSON.stringify({ error: 'There was an error subscribing to the newsletter.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: null }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response('Method Not Allowed', {
    status: 405,
    headers: corsHeaders,
  });
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request, event));
});
