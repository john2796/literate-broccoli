exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", tbl => {
    tbl.increments()
    tbl.string("name").unique()
    tbl.integer("subject_count").defaultTo(0)
    tbl.decimal("score_average")
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("students")
}
