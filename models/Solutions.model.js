const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const solutionSchema = new Schema(
    {
        solutionId: { type: Types.ObjectId, default: () => new Types.ObjectId() },
        userName: { type: String, required: true },
        quizId: { type: Types.ObjectId, required: true },
        questions: [{
            questionId: { type: Types.ObjectId, default: () => new Types.ObjectId() },
            answers: [{
                optionName: { type: String, required: true },
                isChecked: { type: Boolean, default: false , required: true}
            }]
        }]
    },
    { timestamps: true }
);

solutionSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Solution = mongoose.model("Solution", solutionSchema);
module.exports = Solution;
