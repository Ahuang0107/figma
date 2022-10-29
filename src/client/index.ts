interface Staff {
    "create_time": string,
    "create_by": number,
    "update_time": number,
    "update_by": number,
    "id": string,
    "gui": string,
    "gpn": string,
    "user_name": string,
    "user_type": number,
    "name": string,
    "local_name": string,
    "rank_code": string,
    "employee_type": number,
    "service_line_code": string,
    "sub_service_line_code": string,
    "managerial_country": string,
    "bu_code": string,
    "ou_code": string,
    "mu_code": string,
    "smu_code": string,
    "currency": string,
    "counselor_gui": string,
    "mobile_phone": string,
    "gender": number,
    "hire_date": number,
    "rehire_date": number,
    "primary_languages": string,
    "email": string,
    "department": string,
    "data_status": number,
    "deleted": number,
    "sub_group1": string,
    "region": string,
    "legal_entity": string
}

async function staffs(): Promise<Staff[]> {
    return await fetch("http://127.0.0.1:8080/staffs").then((res) => res.json())
}

interface Booking {
    "create_time": number,
    "create_by": number,
    "update_time": number,
    "update_by": number,
    "id": string,
    "start_time": number,
    "end_time": number,
    "staff_id": string,
    "engagement_code_id": string,
    "engagement_type": number,
    "booking_type": number,
    "ghost": boolean,
    "extension": string,
    "total_hours": number
}

async function bookings(): Promise<{ [key: string]: Booking[] }> {
    return await fetch("http://127.0.0.1:8080/bookings").then((res) => res.json())
}

export {
    staffs,
    bookings
}
