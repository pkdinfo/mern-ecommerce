import db from "@/utils/db";
import user from "@/models/user";
import data from "@/utils/data";
import Product from "@/models/Product";


 const handller = async (req, res)=>{
await db.connect();
await user.deleteMany();
await user.insertMany(data.users);
await Product.deleteMany();
  await Product.insertMany(data.products);
await db.disconnect();
res.send({message : 'seeded successfully'});

 }
 export default handller;