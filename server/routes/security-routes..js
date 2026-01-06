import { checksecuritycode } from "../controllers/security-controller.js";

const router = express.Router();
router.post("/checksecuritycode", checksecuritycode);
export default router;
