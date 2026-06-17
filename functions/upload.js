export async function onRequestPost({ request }) {
  try {
    // request එකේ තියෙන body එක කෙලින්ම forward කරනවා
    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: request.body, 
      headers: request.headers
    });

    const result = await response.text();

    return new Response(result, {
      status: response.status,
      headers: { 
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*' // CORS ප්‍රශ්න නැති වෙන්න
      }
    });
  } catch (err) {
    // මොකක් හරි error එකක් ආවොත් ඒක පෙන්වන්න
    return new Response('Error: ' + err.message, { status: 500 });
  }
}
