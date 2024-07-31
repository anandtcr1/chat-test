// https://www.youtube.com/watch?v=4y1a4syMJHM

const fs = require("fs");

const fileName = "data.json";

function loadMessages() {
  messages = [];
  const defaultMessage = {
    role: "system",
    content:
      "you are interviewing the user for a front-end React developer position. Ask short questions that are relevant to junior level developer. Your name is Greg. The user is Anand. Keep responses under 30 words and be funny sometimes.",
  };

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    if (data.length > 0) {
      console.log("data", data);

      const jsonData = JSON.parse(data);
      console.log("File content:", jsonData);

      if (Array.isArray(jsonData)) {
        if (jsonData.length === 0) {
          console.log("3");
          messages.push(defaultMessage);
          console.log(messages);
        }
        // Using forEach
        jsonData.forEach((item, index) => {
          console.log(`Item ${index}:`, item);
          messages.push(item);
        });
      } else {
        console.error("The JSON data is not an array");
        console.log("2");
        messages.push(defaultMessage);
      }
    } else {
      console.log("1", defaultMessage);
      messages.push(defaultMessage);
    }
  });
  console.log("ll - ", messages);
  return messages;
}

function saveMessages(messages, gpt_response) {
  messages.push(gpt_response);
  // Convert JSON object to a string
  const jsonString = JSON.stringify(messages, null, 2);

  // Write JSON string to a file
  fs.writeFile(fileName, jsonString, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("File has been written successfully");
    }
  });
}

async function getChatResponse(user_message) {
  const transcript = {
    role: "user",
    content: "who won the world series in 2020?",
  };

  messages = await loadMessages();
  console.log("messages -> ", messages);
  messages.push(transcript);
  console.log(messages);
  //saveMessages(messages, transcript);
}

// writeToFile();
// loadMessages();

getChatResponse("");
