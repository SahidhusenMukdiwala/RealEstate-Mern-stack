import Agent from "../Models/AgentSchema.js";

export const CreateAgent = async(req,res) =>{
    try{
        const NewAgent = new Agent(req.body)
        NewAgent.save();
        res.status(200).json({success:true, message:"Agent created successfully",data:NewAgent});
    }catch(err){
        res.status(400).json({success:false, message:err.message})
    }
}

export const getAllAgents = async (req, res) => {
    try {
      const agents = await Agent.find();
      res.send(agents);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  
  // Get an agent by ID
export const getAgentById = async (req, res) => {
  const agent = await Agent.findById(req.params.id);
    try {
      if (!agent) {
        return res.status(404).send({ message: 'Agent not found' });
      }
      const { password: pass, ...rest } = agent._doc
      res.send(rest);
    } catch (error) {
      res.status(500).send({ message:"helo"+ error.message });
    }
  };
  
  // Update an agent by ID
export const updateAgentById = async (req, res) => {
    try {
      const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!agent) {
        return res.status(404).send({ message: 'Agent not found' });
      }
      res.send(agent);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };
  
  // Delete an agent by ID
export const deleteAgentById = async (req, res) => {
    try {
      const agent = await Agent.findByIdAndDelete(req.params.id);
      if (!agent) {
        return res.status(404).send({ message: 'Agent not found' });
      }
      res.send({ message: 'Agent deleted successfully' });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };