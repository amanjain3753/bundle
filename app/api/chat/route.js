export async function POST(req) {
  const body = await req.json();

  const res = await fetch(
    " https://subtegumental-eladia-proctodaeal.ngrok-free.dev/webhook/48b4f655-28b1-4deb-bd09-1fb7e1fe2792",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  );

  const text = await res.text();

  return new Response(text, {
    headers: { "Content-Type": "application/json" }
  });
}



// 3AWajef8bzRFB25YB3Daa0RvyoE_21uCkak8XvRpL9uaLaRnC  toke of ngork