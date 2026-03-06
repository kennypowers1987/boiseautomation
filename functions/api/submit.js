export async function onRequestPost(context) {
  // Grab the Zapier Webhook URL from the Cloudflare Environment Variables
  const zapierUrl = context.env.ZAPIER_WEBHOOK_URL;

  if (!zapierUrl) {
    return new Response(JSON.stringify({ error: "ZAPIER_WEBHOOK_URL is not configured in Cloudflare." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // Parse the JSON data sent from the frontend
    const requestData = await context.request.json();

    // Forward the data to Zapier
    const zapierResponse = await fetch(zapierUrl, {
      method: 'POST',
      body: JSON.stringify(requestData)
    });

    if (!zapierResponse.ok) {
      throw new Error(`Zapier responded with status: ${zapierResponse.status}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}