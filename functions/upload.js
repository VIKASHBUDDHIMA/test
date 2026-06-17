export async function onRequestPost({ request }) {
    try {
        // Form එකෙන් එන දත්ත අරගන්නවා
        const formData = await request.formData();

        // Catbox API එකට request එක යවනවා
        const response = await fetch('https://catbox.moe/user/api.php', {
            method: 'POST',
            body: formData
        });

        // Catbox එකෙන් එන result එක අරගන්නවා (මේකේ තියෙන්නේ සාර්ථක වුණොත් link එක)
        const result = await response.text();

        // ලැබෙන ප්‍රතිචාරය Browser එකට යවනවා
        return new Response(result, {
            status: response.status,
            headers: { 'Content-Type': 'text/plain' }
        });
    } catch (e) {
        return new Response('Error: ' + e.message, { status: 500 });
    }
}
