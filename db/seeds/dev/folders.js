exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('urls').del()
    .then(() => knex('folders').del())
    .then(() => {
      return Promise.all([
      // Inserts seed entries
      knex('folders').insert({
        folder_name: 'Sports'
      },'id')
      .then(ids => {
        return knex('urls').insert([
          {
            long_url: 'www.nba.com',
            visits: 0,
            folder_id: ids[0]
          },
          {
            long_url: 'www.mls.com',
            visits: 0,
            folder_id: ids[0]
          },
        ])
      }),
      knex('folders').insert({
        folder_name: 'News'
      },'id')
      .then(ids => {
        return knex('urls').insert([
          {
            long_url: 'www.bloomberg.com',
            visits: 0,
            folder_id: ids[0]
          },
          {
            long_url: 'www.nyt.com',
            visits: 0,
            folder_id: ids[0]
          },
        ])
      }),
    ])
  });
};
