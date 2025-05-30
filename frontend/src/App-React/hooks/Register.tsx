export async function registerPost(name: string, password: string) {


    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
    });


    if (!response.ok) return false;

    console.log("aaaa" + response.ok)

    return true;
}