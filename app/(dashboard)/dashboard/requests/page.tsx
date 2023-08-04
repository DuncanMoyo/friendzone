import { FriendRequests } from "@/components";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

type Props = {};

const page = async (props: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  // ids of people who sent us a friend request
  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incomingFriendRequests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = (await fetchRedis("get", `user:${senderId}`)) as string;
      const senderParsed = JSON.parse(sender) as User
      // console.log("🚀 ~ file: page.tsx:23 ~ incomingSenderIds.map ~ sender:", sender)
      return {
        senderId,
        senderEmail: senderParsed.email,
      };
    })
  );
  // console.log('incomingFriendRequests', incomingFriendRequests);

  return (
    <main className="pt-8">
      <h1 className="font-bold text-5xl mb-8">Add a friend</h1>
      <div className="flex flex-col gap-4">
        <FriendRequests
          incomingFriendRequests={incomingFriendRequests}
          sessionId={session.user.id}
        />
      </div>
    </main>
  );
};

export default page;
