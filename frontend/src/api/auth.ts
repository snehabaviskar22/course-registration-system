const BASE_URL = "http://localhost:8080";

export async function studentLogin(email: string, password: string) {

    const response = await fetch(`${BASE_URL}/students/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    return await response.json();
}

export async function adminLogin(email: string, password: string) {

    const response = await fetch(`${BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    return await response.json();
}

export async function registerStudent(student: any) {

    const response = await fetch(`${BASE_URL}/students/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    return await response.json();
}

export async function getStudentProfile(id: number) {

    const response = await fetch(`${BASE_URL}/students/profile/${id}`);

    return await response.json();
}

export async function updateStudentProfile(id: number, student: any) {

    const response = await fetch(`${BASE_URL}/students/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)

    });

    return await response.json();
}

export async function changePassword(data: any) {

    const response = await fetch(`${BASE_URL}/students/change-password`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    });

    return await response.text();
}

export async function getStudentDashboard(id: number) {

    const response = await fetch(`${BASE_URL}/students/${id}/dashboard`);

    return await response.json();
}

export async function getDepartments() {

    const response = await fetch(`${BASE_URL}/departments`);

    return await response.json();

}

export async function getCourses() {

    const response = await fetch(`${BASE_URL}/courses`);

    return await response.json();
}