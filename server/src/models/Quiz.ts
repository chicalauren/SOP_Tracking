import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  sopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sop', required: true },
  title: { type: String, required: true },
  passingScore: { type: Number, default: 80 }
}, { timestamps: true });

export default mongoose.model('Quiz', quizSchema);

// server/src/models/Question.ts
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  text: { type: String, required: true },
  type: { type: String, enum: ['single', 'multiple'], default: 'single' }
});

export default mongoose.model('Question', questionSchema);

// server/src/models/AnswerOption.ts
import mongoose from 'mongoose';

const answerOptionSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false }
});

export default mongoose.model('AnswerOption', answerOptionSchema);
