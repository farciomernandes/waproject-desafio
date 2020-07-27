import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Request', table => {
    table
      .string('id')
      .notNullable()
      .primary();

    table
      .string('userEmail')
      .nullable()
      .unsigned()
      .references('email')
      .inTable('User')
      .onDelete('CASCADE');

    table.string('title', 80).notNullable();
    table.string('description').notNullable();
    table.decimal('price').notNullable();
    table.integer('quantity').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('Requests');
}
