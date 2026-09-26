import { Worker } from "bullmq";
import { connection } from "./queue.js";
import sendEmail from "./lib/sendEmail.js";

const worker = new Worker("emailQueue", async(job) => {
    const {email, name} = job.data

    if(job.name === 'welcome-email') {
        return await sendEmail({email, name})
    }

}, {connection})

worker.on("completed", (job)=> {
    console.log(`Email sent for job ${job.id} -> ${job.returnvalue.sentTo}`)
})

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed after ${job.attemptsMade} attempts:`, err.message);
});