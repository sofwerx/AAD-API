const knexModelHelper = require('../helpers/knex-model-helper');

const name = 'Tool';
const tableName = 'Tool';

const selectableProps = [
  'Tool.id',
  'Tool.tool_name',
  'Tool.description',
  'Tool.updated_at',
  'Tool.created_at'
];

module.exports = (knex) => {
  const knexHelper = knexModelHelper({
    knex,
    name,
    tableName,
    selectableProps
  });

  const toolsIndex = () => {
    return knex.select(...selectableProps)
      .from('Tool')
      .leftJoin('Survey', 'Tool.id', 'Survey.tool_id')
      .groupBy(['Tool.id'])
      .count({ activeSurveys: knex.raw('case when ?? then 1 end', ['Survey.is_active']) })
      .timeout(1000);
  };

  return {
    ...knexHelper,
    toolsIndex
  };
};
