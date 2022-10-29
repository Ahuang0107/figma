use actix_cors::Cors;
use actix_web::{App, get, HttpServer, Responder};

use crate::booking::{bookings, staffs};

mod booking;

#[get("/")]
async fn hello_world() -> impl Responder {
    format!("Hello World!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allow_any_method()
                    .allow_any_header(),
            )
            .service(hello_world)
            .service(staffs)
            .service(bookings)
    })
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}
