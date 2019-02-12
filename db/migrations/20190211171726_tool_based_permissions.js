exports.up = (knex, Promise) => knex.schema
  .alterTable('User', (table) => {
    table.dropColumn('role_id');
  })
  .dropTableIfExists('UserRole')
  .createTable('GlobalPermission', (table) => {
    table.increments('id');
    table.integer('user_id')
      .references('User.id')
      .onDelete('CASCADE')
      .notNullable();
    table.string('permission_type')
      .notNullable();
  })
  .createTable('ToolPermission', (table) => {
    table.increments('id');
    table.integer('tool_id')
      .references('Tool.id')
      .onDelete('CASCADE')
      .notNullable();
    table.string('permission_type')
      .notNullable();
    table.boolean('is_global')
      .defaultTo(false);
  })
  .createTable('UserToolPermissions', (table) => {
    table.increments('id');
    table.integer('user_id')
      .references('User.id')
      .onDelete('CASCADE');
    table.integer('tool_permission_id')
      .references('ToolPermission.id')
      .onDelete('CASCADE');
  });

exports.down = (knex, Promise) => knex.schema
  .dropTableIfExists('GlobalPermission')
  .dropTableIfExists('UserToolPermissions')
  .dropTableIfExists('ToolPermission')
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
  .alterTable('User', (table) => {
    table.integer('role_id')
      .references('UserRole.id')
      .onDelete('RESTRICT');
  });
