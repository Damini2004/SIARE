const { Op } = require('sequelize');

function normalizeSort(sort) {
  return Object.entries(sort).map(([field, direction]) => [
    field,
    Number(direction) < 0 || String(direction).toLowerCase() === 'desc' ? 'DESC' : 'ASC',
  ]);
}

function getPagination(query) {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(query.limit, 10) || 10, 1), 100);
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

function searchableWhere(fields, search) {
  const term = String(search || '').trim();

  if (!term || !fields.length) {
    return {};
  }

  return {
    [Op.or]: fields.map((field) => ({
      [field]: { [Op.like]: `%${term}%` },
    })),
  };
}

function createResourceController(Model, options = {}) {
  const {
    defaultSort = { createdAt: -1 },
    listFilter = () => ({}),
    searchFields = [],
    sanitize = (data) => data,
  } = options;

  async function list(req, res) {
    const { page, limit, offset } = getPagination(req.query);
    const where = {
      ...listFilter(req),
      ...searchableWhere(searchFields, req.query.search),
    };
    const { count, rows } = await Model.findAndCountAll({
      where,
      order: normalizeSort(defaultSort),
      limit,
      offset,
    });

    res.json({
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    });
  }

 async function detail(req,res){

try{

const item =
await Model.findByPk(
req.params.id
);

console.log(
"MODEL:",
Model.name
);

console.log(
"ITEM:",
item
);

if(!item){

return res.status(404)
.json({
error:
"Record not found"
});

}

res.json(item);

}catch(err){

console.log(
"DETAIL ERROR:",
err
);

throw err;

}

}

  async function create(req, res) {
    const item = await Model.create(sanitize(req.body));
    res.status(201).json(item);
  }

  async function update(req, res) {
    const item = await Model.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Record not found' });
    }

    await item.update(sanitize(req.body));
    res.json(item);
  }

  async function remove(req, res) {
    const item = await Model.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Record not found' });
    }

    await item.destroy();
    res.json({ success: true });
  }

  return {
    list,
    detail,
    create,
    update,
    remove,
  };
}

module.exports = createResourceController;
