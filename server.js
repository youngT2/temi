const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/testimonials')
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

// Define a schema for Testimonials
const testimonialSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

// Create a model from the schema
const Testimonial = mongoose.model('Testimonial', testimonialSchema);

// API endpoint to receive testimonials
app.post('/testimonials', [
    body('name').isLength({ min: 2, max: 50 }).matches(/^[a-zA-Z\s]+$/).trim(),
    body('email').isEmail().normalizeEmail(),
    body('message').isLength({ min: 10, max: 500 }).trim()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const sanitizedMessage = sanitizeHtml(req.body.message);

    const newTestimonial = new Testimonial({
        name: req.body.name,
        email: req.body.email,
        message: sanitizedMessage
    });

    newTestimonial.save()
        .then(item => res.send("Testimonial saved to database"))
        .catch(err => res.status(400).send("Unable to save to database"));
});

// Start the server on port 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
