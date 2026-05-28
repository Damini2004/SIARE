const { Op } = require("sequelize");

const RecentView =
require("../models/RecentView");

exports.create = async (
req,
res
) => {

try {

await RecentView.create({

page:
req.body.page,

});

res.json({
success:
true,
});

}

catch (
err
) {

res
.status(
500
)
.json({

error:
err.message,

});

}

};

exports.list =
async (
req,
res
) => {

const views =
await RecentView.findAll({

where: {

viewedAt: {

[Op.gte]:

new Date(
Date.now()
-
2 *
24 *
60 *
60 *
1000
),

},

},

order:
[
[
"viewedAt",
"DESC",
],
],

});

res.json({

data:
views,

});

};