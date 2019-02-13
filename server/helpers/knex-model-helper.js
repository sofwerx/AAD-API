// The MIT License (MIT)
//
// Copyright (c) 2018, Rob McLarty (http://robmclarty.com)
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
//     distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
//     The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
//     IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
// CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
//     TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// The guts of a model that uses Knexjs to store and retrieve data from a
// database using the provided `knex` instance. Custom functionality can be
// composed on top of this set of common guts.
//
// The idea is that these are the most-used types of functions that most/all
// "models" will want to have. They can be overriden/modified/extended if
// needed by composing a new object out of the one returned by this function ;)
module.exports = ({
  knex = {},
  name = 'name',
  tableName = 'tablename',
  selectableProps = [],
  timeout = 1000
}) => {
  const create = (props) => {
    // not allowed to set `id`
    delete props.id;//eslint-disable-line

    return knex.insert(props)
      .returning(selectableProps)
      .into(tableName)
      .timeout(timeout);
  };

  const findAll = () => knex.select(selectableProps)
    .from(tableName)
    .timeout(timeout);

  const find = filters => knex.select(selectableProps)
    .from(tableName)
    .where(filters)
    .timeout(timeout);

  // Same as `find` but only returns the first match if >1 are found.
  const findOne = filters => find(filters)
    .then((results) => {
      if (!Array.isArray(results)) return results;

      return results[0];
    });

  const findById = id => knex.select(selectableProps)
    .from(tableName)
    .where({ id })
    .timeout(timeout)
    .first();

  const update = (id, props) => {
    // not allowed to set `id` in DB
    delete props.id; //eslint-disable-line

    return knex.update(props)
      .from(tableName)
      .where({ id })
      .returning(selectableProps)
      .timeout(timeout);
  };

  const destroy = id => knex.del()
    .from(tableName)
    .where({ id })
    .timeout(timeout);

  return {
    name,
    tableName,
    selectableProps,
    timeout,
    create,
    findAll,
    find,
    findOne,
    findById,
    update,
    destroy
  };
};
