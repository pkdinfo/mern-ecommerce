import { getSession } from "next-auth/react";
import { getToken } from 'next-auth/jwt';
import db from "@/utils/db";
import Order from "@/models/Order";

const handller = async (req, res)=>{
const session = await getSession({req});
console.log(session);
if(!session)
{
    return res.status(401).send('Signin required');
}

const {user} = session;
await db.connect();
console.log('connection established');
const newOrder = new Order({
    ...req.body,
    user: user._id,
});
const order = await newOrder.save();
res.status(201).send(order);
res.send({message : 'seeded successfully'});

}

export default handller;