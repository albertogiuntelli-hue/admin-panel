export async function loginAdmin(email, password) {
    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        return { success: false, message: data.message };
    }

    return {
        success: true,
        token: data.token,
        role: data.role,
    };
}

