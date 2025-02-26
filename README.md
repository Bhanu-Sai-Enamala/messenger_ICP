# 🏗️ ICP Motoko Smart Contract - CRUD Operations & Pagination

This is a **Motoko-based smart contract** deployed on the **Internet Computer (ICP)** that performs **CRUD (Create, Read, Update, Delete) operations** for messages. It supports **pagination**, ensuring efficient data retrieval.

## 📌 Features
✅ **Create Messages** – Add new messages to the canister.  
✅ **Read Messages** – Fetch messages using pagination or retrieve specific ones.  
✅ **Update Messages** – Modify existing messages.  
✅ **Delete Messages** – Remove messages permanently.  
✅ **Pagination** – Fetch messages in manageable chunks.  
✅ **Latest 10 Messages** – Retrieve the most recent posts efficiently.  
✅ **Candid File Generation** – `.did` file auto-generated using the **Candid extractor**.

---

## 🚀 Quick Deployment
To deploy the backend, frontend, and seed messages, simply run:
```sh
node script.js
```
This will:
1. Start `dfx` locally
2. Deploy both backend & frontend
3. Dump 27 random messages into the canister

---

## 📜 Candid File (`messages_backend.did`)
This contract supports **Candid Interface Extraction**. Run:
```sh
dfx canister call messages_backend __get_candid_interface_tmp_hack
```
Example `.did` file:
```candid
service : {
  create_message : (text) -> (nat);
  get_latest_messages : () -> (vec record { id : nat; content : text; timestamp : int });
  get_messages_paginated : (nat, nat) -> (vec record { id : nat; content : text; timestamp : int });
  update_message : (nat, text) -> (bool);
  delete_message : (nat) -> (bool);
}
```

---

## 🏗️ Contributing
Feel free to **fork the repo** and submit PRs for improvements.

---

## ⚖️ License
MIT License © 2025. All rights reserved.

---

