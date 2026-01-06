
// This file represents the "Model" in MVC.
// It defines the structure of your data and handles database interactions.
// When you connect a real database (like MongoDB), this is where you'll define your Schema.

// Hypothetical Example using Mongoose (for MongoDB):

/*
import mongoose from "mongoose";

// 1. Define the Schema (Structure)
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// 2. Create the Model
const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
*/

// Example Usage in your Controller (controllers/contact-controller.js):
/*
  import Contact from "../models/contact-model.js";

  // To Fetch a row (Find one):
  export const getContact = async (req, res) => {
    try {
      // "F row" -> Fetch/Find a row by email
      const contact = await Contact.findOne({ email: req.body.email });
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // To Save a row (Create):
  export const saveContact = async (req, res) => {
     const newContact = new Contact(req.body);
     await newContact.save();
  };
*/
