import amqp from "amqplib";
import consumer from "./messageConsumer";

const connect = async (): Promise<any> => {
    try {
        const connection: amqp.Connection = await amqp.connect("amqp://localhost");
        const channel: amqp.Channel = await connection.createChannel();
        const results: any = await channel.assertQueue("orders");
        console.log("listening to messages in orders queue");
        consumer(channel);
    } catch (err) {
        console.log(err);
        setTimeout(()=>{
            connect();
        },3000);
    }
}

export default connect;