const router =
require(
"express"
)
.Router();

const c =
require(
"../controllers/recentViewController"
);

router.get(
"/",
c.list
);

router.post(
"/",
c.create
);

module.exports =
router;