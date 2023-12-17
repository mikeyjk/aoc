use std::{fs, process::{Command, Stdio, exit}};

const INPUT_PATH: &str = "./input/sample.txt";

fn main() {
    print_command("pwd".to_string());

    let contents_or_error = fs::read_to_string(INPUT_PATH);

    if contents_or_error.is_err() {
        println!("Unable to open file from path {}", INPUT_PATH);
        exit(0);
    } else {
        let contents = contents_or_error.expect("");
        println!("With text:\n{contents}");
    }

    
}

fn print_command(command: String) {
    let output = Command::new(command.clone())
    // Tell the OS to record the command's output
    .stdout(Stdio::piped())
    // execute the command, wait for it to complete, then capture the output
    .output()
    // Blow up if the OS was unable to start the program
    .unwrap();

    // extract the raw bytes that we captured and interpret them as a string
    let stdout = String::from_utf8(output.stdout).unwrap();

    println!("shell '{}': {}", command.clone(), stdout);
}