import { execSync } from "child_process";

//  Function to run shell commands
function runCommand(command) {
  try {
    console.log(` Running: ${command}`);
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(` Error running command: ${command}\n`, error.message);
    process.exit(1);
  }
}

//   Start Local DFX
runCommand("dfx stop"); // Stop if already running
runCommand("dfx start --background");

//   Deploy Backend & Frontend
runCommand("dfx deploy");

//   Dump 27 Random Messages
console.log(" Dumping 27 random messages...");
for (let i = 1; i <= 27; i++) {
  const randomText = Math.random().toString(36).substring(7); // Generate random string
  runCommand(`dfx canister call messenger_backend createMessage "(\\\"Message #${i} - ${randomText}\\\")"`);
}

console.log(" Deployment and data seeding complete! 🎉");