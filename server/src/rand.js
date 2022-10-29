let staff_id_list = [];

for (let i = 0; i < 100; i++) {
    staff_id_list.push(String(Math.round(Math.random() * 10000000)));
}

console.log(staff_id_list.join("\",\""));