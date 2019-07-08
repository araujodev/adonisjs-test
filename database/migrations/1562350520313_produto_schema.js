'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutoSchema extends Schema {
  up () {
    this.create('produtos', (table) => {
      table.increments()
      
      table.string('descricao').notNullable()
      table.text('descricao_completa').nullable()
      table.decimal('preco_custo', 22, 2).notNullable()
      table.decimal('preco_venda', 22, 2).notNullable()
      table.enu('situacao', [0, 1]).defaultTo(1)
      table.integer('estoque').nullable().defaultTo(0)

      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamps()
    })
  }

  down () {
    this.drop('produtos')
  }
}

module.exports = ProdutoSchema
