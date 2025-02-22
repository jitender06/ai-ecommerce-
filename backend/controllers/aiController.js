const getRecommendations = async (req, res) => {
    const userId = req.user.id; // Assuming JWT middleware
    // Placeholder: Fetch user data and recommend products
    const recommendations = await Product.find().limit(5); // Dummy logic
    res.json(recommendations);
  };
  
  module.exports = { getRecommendations };