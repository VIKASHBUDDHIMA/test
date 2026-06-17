export async function onRequestPost(context) {
    const { request } = context;
    try {
        const formData = await request.formData();
        
        // Catbox API වෙත පරීක්ෂණයක් (Proxy request) සිදු කිරීම
        const response = await fetch('https://catbox.moe/user/api.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.text();
        
        // ලැබුණු ප්‍රතිඵලය නැවත Browser එකට යැවීම
        return new Response(result, {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
        });
    } catch (e) {
        return new Response('Error: ' + e.message, { status: 500 });
    }
}
