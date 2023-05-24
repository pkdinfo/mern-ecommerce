import db from "@/utils/db";
import Product from "@/models/Product";
const handller = async (req, resp) =>{
    await db.connect();
    const product = await Product.findById(req.query.id);
    await db.disconnect();
    resp.send(product);


};

export default handller;