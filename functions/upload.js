export async function onRequestPost({ request }) {
    try {
        // Browser එකෙන් එන මුල්ම request එකේ headers අරගන්නවා (මේකේ තමයි Boundary එක තියෙන්නේ)
        const contentType = request.headers.get("Content-Type");

        // Catbox API එකට request එක යවනවා
        const response = await fetch('https://catbox.moe/user/api.php', {
            method: 'POST',
            body: request.body, // Request එකේ තියෙන file data එක කෙලින්ම යවනවා
            headers: {
                "Content-Type": contentType // මේ header එක අනිවාර්යයි
            }
        });

        // Catbox එකෙන් එන result එක අරගන්නවා
        const result = await response.text();

        return new Response(result, {
            status: response.status,
            headers: { 'Content-Type': 'text/plain' }
        });
    } catch (e) {
        return new Response('Error: ' + e.message, { status: 500 });
    }
}
