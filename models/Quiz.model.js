module.exports = mongoose => {
  const { Schema, Types } = mongoose;

  const quizSchema = new Schema(
    {
        quizId: { type: Types.ObjectId, default: () => new Types.ObjectId() },
        title: { type: String, required: true },
        userId: { type: Types.ObjectId, default: () => new Types.ObjectId() },
        questions: [{
            questionText: { type: String, required: true },
            
            answers: [{
                optionName: { type: String, required: true },
                isChecked: { type: Boolean, default: false }
            }]
        }]
    },
    { timestamps: true }
);


  quizSchema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
  });

  const Quiz = mongoose.model("Quiz", quizSchema);
  return Quiz;
};