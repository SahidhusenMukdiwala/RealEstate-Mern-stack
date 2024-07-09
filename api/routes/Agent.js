import express from 'express';
import { VerifyToken } from '../Utils/verifyUser.js';
import { CreateAgent,deleteAgentById,getAgentById,getAllAgents,updateAgentById } from '../Controllers/AgentController.js';

const router = express.Router();

router.post('/create/agentInfo',CreateAgent)
router.get('/agents', VerifyToken,getAllAgents);
router.get('/agents/:id', VerifyToken,getAgentById);
router.put('/agents/update/:id', VerifyToken,updateAgentById);
router.delete('/agents/delete/:id',VerifyToken,deleteAgentById);

export default router;