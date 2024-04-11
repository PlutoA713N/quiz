module.exports = mongoose => {
    const { Schema, Types } = mongoose;
  
    const quizResultSchema = new Schema(
      {
        userName: { type: String, required: true },
         score: { type: Number }
      },
      { timestamps: true }
  );
  
    quizResultSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
  
    const QuizResult = mongoose.model("QuizResult", quizResultSchema);
    return QuizResult;
};
