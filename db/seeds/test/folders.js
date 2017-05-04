exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('urls').del()
    .then(() => knex('folders').del())
    .then(() => {
      return Promise.all([
      // Inserts seed entries
      knex('folders').insert({
        folder_name: 'NUFC'
      },'id')
      .then(ids => {
        return knex('urls').insert([
          {
            long_url: 'www.nufc.com',
            visits: 0,
            folder_id: ids[0]
          },
          {
            long_url: 'www.nufc.co.uk',
            visits: 0,
            folder_id: ids[0]
          },
        ])
      }),
      knex('folders').insert({
        folder_name: 'Code'
      },'id')
      .then(ids => {
        return knex('urls').insert([
          {
            long_url: 'www.w3schools.com',
            visits: 0,
            folder_id: ids[0]
          },
          {
            long_url: 'www.mdn.com',
            visits: 0,
            folder_id: ids[0]
          },
        ])
      }),
    ])
  });
};
