const mongoose = require('mongoose');

const entrySchema = mongoose.Schema(
  {
    heading: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    bible_book: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const Entry = mongoose.model("Entry", entrySchema)

module.exports = Entry;