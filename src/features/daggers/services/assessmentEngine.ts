// ============================================================
// DAGGERS VIRTUAL INSTRUCTOR ASSESSMENT ENGINE
// Demanding, transparent, objective performance evaluation
// Evaluates submissions against strict rubrics and assigns remedial action
// ============================================================

import type {
  DayEntry,
  InstructorAssessment,
  LessonSubmission,
  MentalSubmission,
  PhysicalLog,
  SSBSubmission,
} from '../types';
import type { DailyCurriculumMission } from '../data/curriculumData';

export interface EvaluationInput {
  mission: DailyCurriculumMission;
  entry: DayEntry;
  quizAnswerIndex?: number;
  mentalAnswer?: string;
  ssbResponse?: string;
  physicalLog?: PhysicalLog;
}

export interface ComprehensiveAssessmentResult {
  lessonSubmission: LessonSubmission;
  mentalSubmission: MentalSubmission;
  ssbSubmission: SSBSubmission;
  physicalLog?: PhysicalLog;
  instructorAssessment: InstructorAssessment;
  overallScore: number;
}

/**
 * Evaluate Knowledge Lesson Quiz
 */
export function evaluateLessonQuiz(
  mission: DailyCurriculumMission,
  selectedAnswerIndex: number | undefined,
): LessonSubmission {
  if (selectedAnswerIndex === undefined || selectedAnswerIndex < 0) {
    return {
      quizAnswerIndex: undefined,
      isQuizPassed: false,
      practicalCompleted: false,
      mastery: 'NOT_STARTED',
    };
  }

  const isCorrect = selectedAnswerIndex === mission.learningLesson.quiz.correctIndex;

  return {
    quizAnswerIndex: selectedAnswerIndex,
    isQuizPassed: isCorrect,
    practicalCompleted: true,
    mastery: isCorrect ? 'COMPETENT' : 'NEEDS_REVISION',
    completedAt: Date.now(),
  };
}

/**
 * Evaluate Mental Challenge Submission
 */
export function evaluateMentalSubmission(
  mission: DailyCurriculumMission,
  userAnswer: string | undefined,
): MentalSubmission {
  const answer = (userAnswer || '').trim();

  if (!answer) {
    return {
      userAnswer: '',
      score: 0,
      submittedAt: Date.now(),
      instructorFeedback: 'No answer submitted. Mental challenge requires active demonstration of reasoning.',
      isCompleted: false,
    };
  }

  const challenge = mission.mentalChallenge;
  let score = 50; // baseline for meaningful attempt
  const rubricScores: Record<string, number> = {};
  const feedbackItems: string[] = [];

  // If multiple-choice or direct answer is expected
  if (challenge.correctAnswer !== undefined) {
    const cleanAnswer = answer.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanTarget = String(challenge.correctAnswer).toLowerCase().replace(/[^a-z0-9]/g, '');

    const isMatch =
      cleanAnswer.includes(cleanTarget) ||
      Boolean(
        challenge.options &&
          challenge.options.some(
            (opt: string) =>
              cleanAnswer === opt.toLowerCase().replace(/[^a-z0-9]/g, '') &&
              opt.toLowerCase().includes(cleanTarget),
          ),
      );

    if (isMatch) {
      score = 95;
      rubricScores['Reasoning Rigor'] = 48;
      rubricScores['Accuracy & Speed'] = 47;
      feedbackItems.push('Accurate conclusion. Logical deduction aligned directly with verified ground truth.');
    } else {
      score = 45;
      rubricScores['Reasoning Rigor'] = 25;
      rubricScores['Accuracy & Speed'] = 20;
      feedbackItems.push(`Inaccurate conclusion. Expected outcome: "${challenge.correctAnswer}".`);
      feedbackItems.push(`Reasoning review: ${challenge.learningExplanation}`);
    }
  } else {
    // Open-ended scenario or psychological evaluation
    const wordCount = answer.split(/\s+/).length;
    if (wordCount < 15) {
      score = 55;
      rubricScores['Depth & Rigor'] = 25;
      rubricScores['Clarity'] = 30;
      feedbackItems.push('Response is too brief. Elaborate on your tactical rationale and trade-off considerations.');
    } else if (wordCount > 40) {
      score = 90;
      rubricScores['Depth & Rigor'] = 45;
      rubricScores['Clarity'] = 45;
      feedbackItems.push('Substantive, well-reasoned response. Clear articulation of operational trade-offs and team safety.');
    } else {
      score = 75;
      rubricScores['Depth & Rigor'] = 38;
      rubricScores['Clarity'] = 37;
      feedbackItems.push('Satisfactory response. Demonstrates understanding of primary principles.');
    }
  }

  return {
    userAnswer: answer,
    score,
    submittedAt: Date.now(),
    instructorFeedback: feedbackItems.join(' '),
    rubricScores,
    isCompleted: score >= 60,
  };
}

/**
 * Evaluate SSB Practical Submission
 */
export function evaluateSSBSubmission(
  _mission: DailyCurriculumMission,
  userResponse: string | undefined,
): SSBSubmission {
  const text = (userResponse || '').trim();

  if (!text) {
    return {
      userResponse: '',
      instructorFeedback: 'No response submitted. Practical SSB performance requires structured written output.',
      isCompleted: false,
    };
  }

  const wordCount = text.split(/\s+/).length;
  const feedback: string[] = [
    'Automated assessment disclaimer: This evaluation reviews observable structural clarity and action orientation; it does not replace a physical Services Selection Board.',
  ];

  const selfRatingOlqs: Record<string, number> = {
    'Effective Intelligence': 4,
    'Social Responsibility': 4,
    'Decisiveness': 4,
  };

  if (wordCount < 20) {
    feedback.push('Response lacks operational detail. Ensure you provide a clear sequence of actions and concrete solutions.');
    selfRatingOlqs['Effective Intelligence'] = 2;
  } else if (wordCount > 60) {
    feedback.push('Clear, detailed narrative with constructive initiative. High officer-like problem-solving demonstrated.');
    selfRatingOlqs['Effective Intelligence'] = 5;
    selfRatingOlqs['Decisiveness'] = 5;
  } else {
    feedback.push('Concise and direct. Action steps are identifiable and pragmatic.');
  }

  return {
    userResponse: text,
    instructorFeedback: feedback.join(' '),
    selfRatingOlqs,
    isCompleted: wordCount >= 15,
  };
}

/**
 * Comprehensive Virtual Instructor Assessment
 */
export function generateInstructorAssessment(
  mission: DailyCurriculumMission,
  lessonSub: LessonSubmission,
  mentalSub: MentalSubmission,
  ssbSub: SSBSubmission,
  physicalLog?: PhysicalLog,
): InstructorAssessment {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  let scoreSum = 0;
  let componentCount = 0;

  // 1. Knowledge Quiz
  if (lessonSub.isQuizPassed) {
    scoreSum += 100;
    strengths.push(`Mastered concept: ${mission.learningLesson.title}`);
  } else if (lessonSub.quizAnswerIndex !== undefined) {
    scoreSum += 40;
    weaknesses.push(`Quiz concept unverified: ${mission.learningLesson.title}`);
  }
  componentCount++;

  // 2. Mental Challenge
  scoreSum += mentalSub.score;
  componentCount++;
  if (mentalSub.score >= 80) {
    strengths.push(`Strong cognitive performance in ${mission.mentalChallenge.title}`);
  } else if (mentalSub.isCompleted) {
    strengths.push('Mental challenge attempted with reasoning effort');
  } else {
    weaknesses.push('Mental challenge reasoning requires deeper analytical rigor');
  }

  // 3. SSB Exercise
  if (ssbSub.isCompleted) {
    scoreSum += 85;
    strengths.push(`Structured submission completed for ${mission.ssbAssignment.title}`);
  } else {
    scoreSum += 20;
    weaknesses.push(`Incomplete SSB drill: ${mission.ssbAssignment.title}`);
  }
  componentCount++;

  // 4. Physical Training
  if (physicalLog && physicalLog.safetyConfirmed) {
    scoreSum += 90;
    strengths.push('Physical training logged with verified safety confirmation');
  } else {
    scoreSum += 30;
    weaknesses.push('Physical training unverified or safety checklist unconfirmed');
  }
  componentCount++;

  const totalScore = Math.round(scoreSum / componentCount);

  let overallGrade: InstructorAssessment['overallGrade'] = 'UNSATISFACTORY';
  let remedialAction: string | undefined = undefined;

  if (totalScore >= 85) {
    overallGrade = 'EXEMPLARY';
    remedialAction = 'Maintain standard. Advance to next scheduled mission.';
  } else if (totalScore >= 70) {
    overallGrade = 'COMPETENT';
    remedialAction = 'Review missed quiz/mental questions during evening study block.';
  } else if (totalScore >= 50) {
    overallGrade = 'MARGINAL';
    remedialAction = `Remedial Revision: Re-read lesson "${mission.learningLesson.title}" and repeat mental drill before progressing.`;
  } else {
    overallGrade = 'UNSATISFACTORY';
    remedialAction = 'Mission objectives unmet. Repeat study block and complete practical tasks in CHRONOS focus mode.';
  }

  const feedbackSummary = `Instructor Assessment: Candidate achieved ${totalScore}% overall efficiency. Grade: ${overallGrade}. ${
    overallGrade === 'EXEMPLARY'
      ? 'Execution reflects high officer-like discipline and sharp mental focus.'
      : overallGrade === 'COMPETENT'
      ? 'Satisfactory effort across primary training pillars. Minor refinements needed.'
      : 'Performance falls below academy standard. Rectify identified weaknesses promptly.'
  }`;

  return {
    overallGrade,
    totalScore,
    feedbackSummary,
    strengths,
    weaknesses,
    remedialAction,
    assessedAt: Date.now(),
  };
}
