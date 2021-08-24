extern crate term;
extern crate rustyline;
extern crate reqwest;

use std::env;
use std::thread;
use rustyline::error::ReadlineError;
use rustyline::Editor;

fn main () {
    let mut rl = Editor::<()>::new();

    thread::spawn(move || {
        loop {
            let mut resp = reqwest::get("http://[::]:12345/api/room/1").unwrap();
            let mut t = term::stdout().unwrap();
            if resp.status().is_success() {
                resp.copy_to(&mut t);
            } else if resp.status().is_server_error() {
                t.fg(term::color::RED).unwrap();
                write!(t, "Server error! Status: {:?}", resp.status());
                t.reset().unwrap();
            } else {
                t.fg(term::color::CYAN).unwrap();
                write!(t, "Something else happened. Status: {:?}", resp.status());
                t.reset().unwrap();
            }
        }
    });

    let args: Vec<String> = env::args().collect();
    let name = &args[1];
    loop {
        let mut who = String::from(name);
        who.push_str(": ");
        let readline = rl.readline(who.as_str());
        match readline {
            Ok(line) => {
                let client = reqwest::Client::new();
                let mut whom = String::from(name);
                whom.push_str(": ");
                whom.push_str(&line.clone());
                client.post("http://localhost:8088/room/1")
                    .body(whom)
                    .send().unwrap();
            },
            Err(ReadlineError::Interrupted) => {
                println!("CTRL-C");
                break
            },
            Err(ReadlineError::Eof) => {
                println!("CTRL-D");
                break
            },
            Err(err) => {
                println!("Error: {:?}", err);
                break
            }
        }
    }
}
