export async function login(): Promise<any> {
    const formData = new FormData();
    formData.append('username', 'smarthubdev');
    formData.append('password', 'smarthub@1234');
    const startTime = Date.now();
    const result = await fetch("http://192.168.207.17/server/endpoint/admin_user/login", {
        body: formData,
        method: "post",
        headers: {
            "test": "7EBZfzzrPWHBmXJtl#86LDs6varwXlYF"
        }
    }).then((res) => res.json()).then((res) => res.data);
    console.log("login response time: ", Date.now() - startTime);
    return result
}

interface Staff {
    "createTime": string,
    "createBy": number,
    "updateTime": number,
    "updateBy": number,
    "id": string,
    "gui": string,
    "gpn": string,
    "userName": string,
    "userType": number,
    "name": string,
    "localName": string,
    "rankCode": string,
    "employeeType": number,
    "serviceLineCode": string,
    "subServiceLineCode": string,
    "managerialCountry": string,
    "buCode": string,
    "ouCode": string,
    "muCode": string,
    "smuCode": string,
    "currency": string,
    "counselorGui": string,
    "mobilePhone": string,
    "gender": number,
    "hireDate": number,
    "rehireDate": number,
    "primaryLanguages": string,
    "email": string,
    "department": string,
    "dataStatus": number,
    "deleted": number,
    "subGroup1": string,
    "region": string,
    "legalEntity": string
}

async function staffs(start: number, size: number): Promise<Staff[]> {
    const startTime = Date.now();
    const result: Staff[] = await fetch("http://192.168.207.17/server/endpoint/basic/staff/listByViewConfig", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "test": "7EBZfzzrPWHBmXJtl#86LDs6varwXlYF"
        },
        body: JSON.stringify({
            start,
            size,
            viewConditionQOS: [{
                condition: "=",
                fieldCode: "CN413",
                fieldName: "bu_code",
                operation: "and",
                fieldValue: "EYHMLLP-Hangzhou"
            }, {
                condition: "=",
                fieldCode: "1",
                fieldName: "data_status",
                operation: "and",
                fieldValue: "active"
            }]
        })
    }).then((res) => res.json()).then((res) => res.data);
    console.log(`staff view response time: ${Date.now() - startTime}  with ${result.length} rows`);
    return result
}

export interface Booking {
    "createTime": number,
    "createBy": number,
    "updateTime": number,
    "updateBy": number,
    "id": string,
    "startTime": number,
    "endTime": number,
    "staffId": string,
    "engagementCodeId": string,
    "engagementType": number,
    "bookingType": number,
    "ghost": boolean,
    "extension": string,
    "totalHours": number
}

async function bookings(staffIds: string, startDate: number, endDate: number): Promise<{ [key: string]: Booking[] }> {
    const startTime = Date.now();
    const result = await fetch("http://192.168.207.17/server/endpoint/booking/listByViewConfig", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "test": "7EBZfzzrPWHBmXJtl#86LDs6varwXlYF"
        },
        body: JSON.stringify({
            staffIds: staffIds,
            startDate: startDate,
            endDate: endDate,
            viewConditionQOS: []
        })
    }).then((res) => res.json()).then((res) => res.data);
    console.log(`booking view response time: ${Date.now() - startTime}`);
    return result
}

interface Engagement {
    "createTime": number,
    "createBy": number,
    "updateTime": number,
    "updateBy": number,
    "id": string,
    "name": string,
    "code": string,
    "dummyCode": string,
    "engCategory": number,
    "engType": number,
    "serviceLineCode": string,
    "subServiceLineCode": string,
    "managerialLocation": string,
    "legalEntity": string,
    "buCode": string,
    "ouCode": string,
    "muCode": string,
    "smuCode": string,
    "currency": string,
    "areaId": number,
    "pyEngageCode": string,
    "globalServiceCode": string,
    "openCodeErp": number,
    "clientCode": string,
    "clientName": string,
    "picId": number,
    "picName": string,
    "eicId": number,
    "eicName": string,
    "dataStatus": number,
    "dataType": number,
    "deleted": boolean,
    "match": boolean,
    "dummy": boolean,
    "closed": boolean
}

async function engagements(ids: string[]): Promise<Engagement[]> {
    const startTime = Date.now();
    const result: Engagement[] = await fetch("http://192.168.207.17/server/endpoint/basic/engage/listByIds?ids=" + ids.join(), {
        headers: {
            "test": "7EBZfzzrPWHBmXJtl#86LDs6varwXlYF"
        }
    }).then((res) => res.json()).then((res) => res.data);
    console.log(`engagement view response time: ${Date.now() - startTime} with ${result.length} rows`);
    return result
}

export {
    staffs,
    bookings,
    engagements
}
