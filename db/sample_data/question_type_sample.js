module.exports = [
  {
    short_name: 'likert_scale',
    long_name: 'Agree to Disagree',
    description: 'Question default answer options from Strongly Agree to Strongly Disagree',
    has_custom_values: false,
    is_multiple_choice: false
  },
  {
    short_name: 'int_background_select',
    long_name: 'Intelligence Background Select',
    description: 'Question with values populated for intelligence backgrounds.',
    has_custom_values: false,
    is_multiple_choice: false
  },
  {
    short_name: 'rating_scale',
    long_name: 'Zero to One-Hundred Number Scale',
    description: 'Question with the answer in the form of 0 to 100.',
    has_custom_values: false,
    is_multiple_choice: false
  },
  {
    short_name: 'multiple_choice_single',
    long_name: 'Multiple Choice Question - Single Answer',
    description: 'Question with the answer in the form of single answer multiple_choice.',
    has_custom_values: true,
    is_multiple_choice: false
  },
  {
    short_name: 'multiple_choice_multi',
    long_name: 'Multiple Choice Question - Multiple Answers',
    description: 'Question with the answer in the form of multiple answer multiple_choice.',
    has_custom_values: true,
    is_multiple_choice: true
  },
  {
    short_name: 'text_field',
    long_name: 'Text Field',
    description: 'Text Field for Long form answers',
    has_custom_values: false,
    is_multiple_choice: false
  },
  {
    short_name: 'overall_percent',
    long_name: 'Represents a percent value.',
    description: 'Provide a value from Zero to One-Hundred Percent',
    has_custom_values: false,
    is_multiple_choice: false
  }
];
