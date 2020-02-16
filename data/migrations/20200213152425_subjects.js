exports.up = function(knex, Promise) {
  return knex.schema.createTable("subjects", tbl => {
    tbl.increments()
    tbl.string("subject").unique()
    tbl.integer("subject_score")
    tbl.string("date")

    tbl
      .integer("student_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("students")
      .onDelete("restrict")
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("subjects")
}
