import { defineDb, defineTable, column } from 'astro:db';

const Musicians = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    name: column.text(),
    description: column.text({ optional: true }),
    image: column.text()
  }
})

export default defineDb({
  tables: { Musicians }
});