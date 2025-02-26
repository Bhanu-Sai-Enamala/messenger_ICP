import Time "mo:base/Time";
import List "mo:base/List";
import Array "mo:base/Array";

actor MessageBoard {
  
  type Message = {
    id: Nat;
    content: Text;
    timestamp: Time.Time;
  };

  stable var messages: List.List<Message> = List.nil<Message>();
  stable var nextId: Nat = 0;  
  stable var totalMessages: Nat = 0; //  Track total messages for efficiency

  //  Create a new message
  public func createMessage(content: Text) : async Nat {
    let newMessage: Message = {
      id = nextId;
      content = content;
      timestamp = Time.now();
    };
    messages := List.push(newMessage, messages);
    nextId += 1;
    totalMessages += 1; //  Update total message count
    return newMessage.id;
  };

  //  Read a message by ID
  public query func readMessage(id: Nat) : async ?Message {
    List.find(messages, func (m: Message) : Bool { m.id == id });
  };

  //  Update a message by ID
  public func updateMessage(id: Nat, newContent: Text) : async Bool {
    var updated = false;
    messages := List.map(messages, func (m: Message) : Message {
      if (m.id == id) {
        updated := true;
        { id = m.id; content = newContent; timestamp = Time.now() }
      } else { m }
    });
    return updated;
  };

  //  Delete a message by ID
  public func deleteMessage(id: Nat) : async Bool {
    let filteredMessages = List.filter(messages, func (m: Message) : Bool { m.id != id });
    let deleted = List.size(messages) != List.size(filteredMessages);
    messages := filteredMessages;
    
    if (deleted and totalMessages > 0) {
      totalMessages -= 1; //  Decrease total count only if deletion happens
    };

    return deleted;
  };

  //  Get total number of messages
  public query func getTotalMessages() : async Nat {
    return totalMessages;
  };

  //  Fetch latest 10 messages efficiently
  public query func getLatestMessages() : async [Message] {
    let arr = List.toArray(messages);
    let len = Array.size(arr);

    //  If no messages, return an empty array
    if (len == 0) {
        return [];
    };

    //  Ensure start is within bounds
    let start : Nat = if (len > 10) { len - 10 } else { 0 };

    //  Prevent `Array.subArray()` from crashing
    if (start >= len) {
        return arr; // If start is out of bounds, return the full array
    };

    return Array.subArray(arr, start, 10);
};

  // pagination function
  public query func getMessagesPaginated(offset: Nat, limit: Nat) : async [Message] {
    let arr = List.toArray(messages);
    let len = Array.size(arr);
    if (offset >= len) {
      return [];
    };
    let actualLimit = if (offset + limit > len) { len - offset } else { limit };
    return Array.subArray(arr, len - offset - actualLimit, actualLimit);
  };
};