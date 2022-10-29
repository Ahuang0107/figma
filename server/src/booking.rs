use actix_web::{get, Responder, web};
use rand::Rng;
use serde::Serialize;
use std::collections::HashMap;

#[get("/staffs")]
pub async fn staffs() -> impl Responder {
    let result = serde_json::from_str::<Vec<&str>>(STAFF_ID_LIST)
        .unwrap()
        .iter()
        .map(|id| Staff::new(id))
        .collect::<Vec<Staff>>();
    web::Json(result)
}

#[get("/bookings")]
pub async fn bookings() -> impl Responder {
    let mut rng = rand::thread_rng();
    let mut result: HashMap<String, Vec<Booking>> = HashMap::new();
    serde_json::from_str::<Vec<&str>>(STAFF_ID_LIST)
        .unwrap()
        .iter()
        .for_each(|id| {
            let mut bookings: Vec<Booking> = vec![];
            // start from 2022-06-27 Mon 9:00
            let mut time = 1656291600;
            // end till 2023-07-03 Mon 9:00
            while time <= 1688346000 {
                bookings.push(Booking::new(
                    id,
                    time * 1000,
                    (time + rng.gen_range(0..WORKDAY_DURING)) * 1000,
                ));
                time += WEEK_DURING;
            }
            result.insert(id.to_string(), bookings);
        });
    web::Json(result)
}

static STAFF_ID_LIST: &str = r#"[
"2833543", "5467960", "1489534", "4281916", "6434579", "4107093", "6917436", "7042202",
"2853301", "9558520", "1906138", "7939253", "3085299", "6505937", "4172199", "2908123",
"2562329", "6853612", "5448300", "3699235", "4104131", "8477776", "9633693", "3938090",
"833865", "9789001", "7649974", "9716019", "9686500", "7635172", "7685782", "9101974",
"4214645", "72683", "203379", "331022", "6100236", "7506736", "5458540", "1242732",
"1101467", "9318250", "4643381", "4993685", "7491452", "5183791", "9609270", "1758869",
"5796502", "890814", "9260587", "2697996", "8643330", "9389538", "4329228", "9299281",
"2426457", "2609331", "6096353", "8835061", "7073965", "1041168", "2367436", "8414146",
"3637686", "2135660", "3092797", "8518040", "5410581", "1874438", "510461", "9030794",
"2101574", "9300558", "7091973", "683070", "5540604", "2794258", "4940045", "5479771",
"4701727", "8108163", "7264355", "7038786", "3930672", "8599948", "3219784", "2992567",
"6675259", "895129", "8547878", "3687652", "6359534", "6411143", "7342159", "4470057",
"684110", "24866", "343366", "2944911"]"#;

static WEEK_DURING: usize = 604800;
static WORKDAY_DURING: usize = 378000;

#[derive(Serialize)]
struct Staff {
    create_time: usize,
    create_by: usize,
    update_time: usize,
    update_by: usize,
    id: String,
    gui: String,
    gpn: String,
    user_name: String,
    user_type: usize,
    name: String,
    local_name: String,
    rank_code: String,
    employee_type: usize,
    service_line_code: String,
    sub_service_line_code: String,
    managerial_country: String,
    bu_code: String,
    ou_code: String,
    mu_code: String,
    smu_code: String,
    currency: String,
    counselor_gui: String,
    mobile_phone: String,
    gender: usize,
    hire_date: usize,
    rehire_date: usize,
    primary_languages: String,
    email: String,
    department: String,
    data_status: usize,
    deleted: usize,
    sub_group1: String,
    region: String,
    legal_entity: String,
}

impl Staff {
    fn new(id: &str) -> Self {
        Self {
            create_time: 1662359911000,
            create_by: 0,
            update_time: 1664553600000,
            update_by: 0,
            id: id.to_string(),
            gui: "8411326".to_string(),
            gpn: "CN010045052".to_string(),
            user_name: "CN010045052".to_string(),
            user_type: 0,
            name: "Wang,Gloria".to_string(),
            local_name: "王烨".to_string(),
            rank_code: "213".to_string(),
            employee_type: 0,
            service_line_code: "01".to_string(),
            sub_service_line_code: "0101".to_string(),
            managerial_country: "CN01  China".to_string(),
            bu_code: "CN413".to_string(),
            ou_code: "01070".to_string(),
            mu_code: "00870".to_string(),
            smu_code: "0101001".to_string(),
            currency: "CN".to_string(),
            counselor_gui: "".to_string(),
            mobile_phone: "".to_string(),
            gender: 0,
            hire_date: 1222012800000,
            rehire_date: 1222012800000,
            primary_languages: "ZHS".to_string(),
            email: "Gloria-YW.Wang@cn.ey.com".to_string(),
            department: "007953Assurance HZ".to_string(),
            data_status: 1,
            deleted: 0,
            sub_group1: "".to_string(),
            region: "CN".to_string(),
            legal_entity: "CN_E&Y Hua Ming LLP".to_string(),
        }
    }
}

#[derive(Serialize)]
struct Booking {
    create_time: usize,
    create_by: usize,
    update_time: usize,
    update_by: usize,
    id: String,
    start_time: usize,
    end_time: usize,
    staff_id: String,
    engagement_code_id: String,
    engagement_type: usize,
    booking_type: usize,
    ghost: bool,
    extension: String,
    total_hours: usize,
}

impl Booking {
    fn new(staff_id: &str, start_time: usize, end_time: usize) -> Self {
        Self {
            create_time: 1666753024000,
            create_by: 261939,
            update_time: 1666753024000,
            update_by: 0,
            id: "63591280033db2a691e1fb77".to_string(),
            start_time,
            end_time,
            staff_id: staff_id.to_string(),
            engagement_code_id: "152476".to_string(),
            engagement_type: 1,
            booking_type: 111,
            ghost: false,
            extension: "{\"comment\": \"\", \"location\": \"\"}".to_string(),
            total_hours: 32,
        }
    }
}
