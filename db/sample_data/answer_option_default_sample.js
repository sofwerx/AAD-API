const backgroundSelect = {
  question_type: 'int_background_select',
  values: ['NOT SPECIFIED', 'SIGINT', 'GEOINT', 'HUMINT', 'TECHINT', 'CYBINT/DNINT', 'MASINT', 'FININT', 'OSINT']
};
const likertScale = {
  question_type: 'likert_scale',
  values: ['Strong Disagree', 'Disagree', 'Indifferent', 'Agree', 'Strongly Agree']
};

module.exports = [
  backgroundSelect,
  likertScale
];
