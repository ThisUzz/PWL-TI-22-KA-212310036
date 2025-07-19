const express = require('express');
const cors = require('cors');
const Sentiment = require('sentiment');

const app = express();
app.use(cors());
app.use(express.json());

const sentiment = new Sentiment();

function chooseRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ========== VARIATION BANK ==========

const badWords = [
  "fuck", "fucks", "fucking", "fucked",
  "shit", "shitty", "bullshit",
  "bitch", "bitches", "asshole", "assholes",
  "bastard", "bastards", "dumbass", "motherfucker",
  "cunt", "cunts", "fucker", "fuckers",
  "slut", "sluts", "whore", "whores",
  "crap", "dick", "dicks", "suck my", "idiot", "retard",
  "piss off", "bloody", "bollocks", "moron", "jackass", "prick",
  "wanker", "twat", "dipshit", "douche", "douchebag", "cum",
  "cumshot", "ballsack", "nutsack", "motherfucking", "cock", "cocks",
  "jerkoff", "jerk off", "shithead", "buttfuck", "arsehole",
  "hoe", "hoes", "dumbfuck", "shitface", "bastardo",
  "hell", "damn", "goddamn", "god damn", "fml", "lmfao",
  "stfu", "gtfo", "wtf", "omfg", "mf", "f u", "f-u",
  "kill yourself", "kys", "die", "die bitch", "burn in hell",
  "go to hell", "piece of shit", "son of a bitch", "sonofabitch"
];


const warningReplies = [
  "Whoa, chill! Let's keep it friendly 😊",
  "Hey, let's keep the vibe positive here! 😇",
  "Mind your words, pal. I'm trying to help 🤗",
  "Whoa there! Maybe use nicer words? 💫",
  "Yikes, let's tone it down a bit, okay? 😅",
  "Come on, let's keep it cool and respectful ✌️"
];

const greetings = [
  "Hey! 👋 What's up?",
  "Hi there! How's your day going?",
  "Yo! Need anything?",
  "Sup! How can I help you today?",
  "Hello friend! 😊",
  "Hiii! 🙌 What can I do for you?",
  "Hey hey! I'm here to chat.",
  "Wassup! Ready to help.",
  "Howdy! 🤠 What brings you here?",
  "Hiya! How can I assist?"
];

const thanksReplies = [
  "You're welcome! ❤️",
  "No prob at all! 🤗",
  "Always got you covered!",
  "Anytime! Hit me up if you need more.",
  "Glad I could help. 😊",
  "No worries, happy to assist.",
  "Sure thing! I'm always here.",
  "Aww, you're welcome! 🌟",
  "Happy to help out!",
  "Anytime you need me!"
];

const positiveReplies = [
  "That's awesome! 😎",
  "Love hearing that! Keep it up! 🙌",
  "Yay! That's really nice!",
  "Sweet! Stay positive.",
  "Amazing! Love your vibe!",
  "Heck yeah! That’s the spirit! 🤘",
  "Super glad to hear that!",
  "That made my day!",
  "Rock on! 🤘",
  "Woohoo! Keep it going!"
];

const negativeReplies = [
  "Ugh, that sucks. Want to talk about it?",
  "Oh no! 😢 I'm here for you.",
  "That doesn't sound great. Spill it if you want.",
  "I'm all ears if you wanna vent.",
  "Dang, sorry to hear. Anything I can do?",
  "Yikes. Hope things get better soon.",
  "Man, that's rough. I'm here to listen.",
  "Sorry you're feeling that way. I'm listening.",
  "Wish I could give you a virtual hug 🤗",
  "I'm here to help if you wanna share more."
];

const confusedReplies = [
  "Hmm, you lost me there. 😅",
  "Wait, what? Could you clarify?",
  "I'm not sure I follow. Mind explaining?",
  "Haha sorry, my bot brain didn't get that. 😆",
  "Say that again? I wanna help!",
  "Could you put it another way?",
  "Umm... come again? 😊",
  "You might have to dumb it down for me 😅",
  "Whoa, over my head! Can you rephrase?"
];

const whoAreYouReplies = [
  "I'm just your chill AI buddy here to chat. 🤖",
  "Your friendly virtual sidekick! 🙌",
  "A smart-ass bot who loves to help! 😂",
  "Just a bot, but a pretty cool one. 😎",
  "Your personal chat assistant at your service!",
  "Call me your AI homie! 🤗",
  "Just here to keep you company and help out.",
  "Your trusty chatbot pal!",
  "You can think of me as your virtual BFF!"
];

const howAreYouReplies = [
  "I'm doing dope! How about you? 😎",
  "Feelin' good! How you holding up?",
  "Pretty chill today! What's up with you?",
  "I'm all systems go! 🚀 You?",
  "Great as always. How you doin'?",
  "Can't complain! And you?",
  "I'm vibin'! How about yourself?",
  "Solid as a rock. How you feelin'?",
  "Running at full power today!",
  "Living the bot life. How's yours?"
];

const goodbyeReplies = [
  "Catch ya later! ✌️",
  "Peace out! Take care.",
  "See ya! Don't be a stranger. 👋",
  "Bye for now! Hit me up anytime.",
  "Later alligator! 🐊",
  "Take it easy! 🤗",
  "Adios! Until next time.",
  "Catch you on the flip side!",
  "Stay cool! Talk soon.",
  "Be well! Until we chat again."
];

// ========== ENDPOINT ==========

app.post('/api/bot/reply', (req, res) => {
  const { message } = req.body;
  if (!message || message.trim() === "") {
    return res.json({
      reply: "Your message seems empty. Could you try typing something?",
      userSentiment: "Neutral",
      botSentiment: "Neutral"
    });
  }

  const lower = message.toLowerCase();

  // Analyze user sentiment
  const result = sentiment.analyze(message);
  let userSentiment = "Neutral";
  if (result.score > 1) userSentiment = "Positive";
  else if (result.score < -1) userSentiment = "Negative";

  let reply = "";
  let botSentiment = "Neutral";  // Default

  // 1️⃣ Check profanity
  if (badWords.some(word => lower.includes(word))) {
    reply = chooseRandom(warningReplies);
    botSentiment = "Neutral";
    return res.json({
      reply,
      userSentiment: "Negative",
      botSentiment
    });
  }

  // 2️⃣ Rule-based responses
  if (["hai","hello","Halo","hallo", "hi", "hey", "good morning", "good evening", "yo", "sup", "hiya", "wassup", "what's up"].some(word => lower.includes(word))) {
    reply = chooseRandom(greetings);
    botSentiment = "Positive";
    return res.json({ reply, userSentiment, botSentiment });
  }

  if (lower.includes("how are you") || lower.includes("how's it going")|| lower.includes("how you doing") || lower.includes("how are") || lower.includes("how you doin")) {
    reply = chooseRandom(howAreYouReplies);
    botSentiment = "Positive";
    return res.json({ reply, userSentiment, botSentiment });
  }

  if (lower.includes("thank") || lower.includes("thx") || lower.includes("thanks a lot") || lower.includes("ty") || lower.includes("appreciate it")) {
    reply = chooseRandom(thanksReplies);
    botSentiment = "Positive";
    return res.json({ reply, userSentiment, botSentiment });
  }

  if (lower.includes("who are you") || lower.includes("what are you") || lower.includes("introduce yourself") || lower.includes("what's your name")) {
    reply = chooseRandom(whoAreYouReplies);
    botSentiment = "Neutral";
    return res.json({ reply, userSentiment, botSentiment });
  }

  if (["bye", "goodbye", "see you", "cya", "later", "peace out", "adios"].some(word => lower.includes(word))) {
    reply = chooseRandom(goodbyeReplies);
    botSentiment = "Neutral";
    return res.json({ reply, userSentiment, botSentiment });
  }

  // 3️⃣ Sentiment-driven fallback
  if (userSentiment === "Positive") {
    reply = chooseRandom(positiveReplies);
    botSentiment = "Positive";
  }
  else if (userSentiment === "Negative") {
    reply = chooseRandom(negativeReplies);
    botSentiment = "Neutral";
  }
  else {
    reply = chooseRandom(confusedReplies);
    botSentiment = "Neutral";
  }

  res.json({ reply, userSentiment, botSentiment });
});

// ========== Start Server ==========
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
