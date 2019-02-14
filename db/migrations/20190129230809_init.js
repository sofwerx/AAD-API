exports.up = (knex, Promise) => knex.schema
  .createTable('Tool', (table) => {
    table.increments('id');
    table.string('tool_name')
      .notNullable();
    table.text('description');
    table.timestamps(true, true);
  })

  .createTable('ToolDetail', (table) => {
    table.increments('id');
    table.integer('tool_id')
      .notNullable()
      .references('Tool.id')
      .onDelete('CASCADE');
    table.string('detail_key')
      .notNullable();
    table.text('detail_value')
      .notNullable();
    table.timestamps(true, true);
  })

  .createTable('Survey', (table) => {
    table.increments('id');
    table.integer('tool_id')
      .notNullable()
      .references('Tool.id')
      .onDelete('RESTRICT');
    table.string('survey_name');
    table.boolean('is_active')
      .defaultTo(false);
    table.timestamps(true, true);
  })

  .createTable('QuestionType', (table) => {
    table.increments('id');
    table.string('long_name')
      .notNullable();
    table.string('short_name')
      .unique()
      .notNullable();
    table.string('description');
    table.boolean('has_custom_values')
      .defaultTo(true);
    table.boolean('is_multiple_choice')
      .defaultTo(false);
    table.timestamps(true, true);
  })

  .createTable('Question', (table) => {
    table.increments('id');
    table.integer('question_type_id')
      .notNullable()
      .references('QuestionType.id')
      .onDelete('RESTRICT');
    table.integer('survey_id')
      .notNullable()
      .references('Survey.id')
      .onDelete('CASCADE');
    table.integer('question_order')
      .defaultTo(1);
    table.string('question_text')
      .notNullable();
    table.string('question_subtext');
    table.boolean('is_required')
      .defaultTo(true);
    table.timestamps(true, true);
  })

  .createTable('AnswerOption', (table) => {
    table.increments('id');
    table.integer('question_type_id')
      .notNullable()
      .references('QuestionType.id')
      .onDelete('RESTRICT');
    table.integer('question_id')
      .nullable()
      .references('Question.id')
      .onDelete('CASCADE');
    table.string('answer_option_value');
    table.integer('option_order').defaultTo(1);
    table.timestamps(true, true);
  })

  .createTable('UserRole', (table) => {
    table.increments('id');
    table.string('rolename')
      .unique()
      .notNullable();
    table.boolean('read')
      .defaultTo(false)
      .notNullable();
    table.boolean('write')
      .defaultTo(false)
      .notNullable();
    table.boolean('publish')
      .defaultTo(false)
      .notNullable();
  })

  .createTable('User', (table) => {
    table.increments('id');
    table.integer('role_id')
      .references('UserRole.id')
      .onDelete('RESTRICT');
    table.string('username')
      .notNullable()
      .unique();
    table.string('email')
      .notNullable();
    table.string('first_name');
    table.string('last_name');
    table.string('job_title');
    table.string('company');
    table.timestamps(true, true);
  })

  .createTable('SurveyResponse', (table) => {
    table.increments('id');
    table.integer('user_id')
      .notNullable()
      .references('User.id')
      .onDelete('CASCADE');
    table.integer('survey_id')
      .notNullable()
      .references('Survey.id')
      .onDelete('RESTRICT');
    table.boolean('is_public')
      .defaultTo(false);
    table.timestamps(true, true);
  })

  .createTable('Answer', (table) => {
    table.increments('id');
    table.integer('survey_response_id')
      .references('SurveyResponse.id')
      .onDelete('CASCADE')
      .notNullable();
    table.integer('question_id')
      .references('Question.id')
      .onDelete('RESTRICT')
      .notNullable();
    table.text('answer_text');
    table.integer('answer_numeric');
    table.boolean('answer_bool');
  });

exports.down = (knex, Promise) => knex.schema
  .dropTableIfExists('Answer')
  .dropTableIfExists('SurveyResponse')
  .dropTableIfExists('AnswerOption')
  .dropTableIfExists('Question')
  .dropTableIfExists('QuestionType')
  .dropTableIfExists('Survey')
  .dropTableIfExists('ToolDetail')
  .dropTableIfExists('Tool')
  .dropTableIfExists('User')
  .dropTableIfExists('UserRole');
