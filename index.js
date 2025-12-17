import express from "express";

const app = express();
app.use(express.json());

const VERIFY_TOKEN = "triora_facebook_webhook";

// Facebook verification (this is what Meta checks)
app.get("/webhooks/facebook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Facebook events (posts, comments, etc.)
app.post("/webhooks/facebook", (req, res) => {
  console.log("Facebook webhook event:");
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Webhook running on port ${port}`);
});
