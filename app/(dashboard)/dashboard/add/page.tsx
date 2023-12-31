import { AddFriendButton } from "@/components";

const page = () => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return (
    <main className="pt-8">
      <h1 className="font-bold text-5xl mb-8">Add a friend</h1>
      <AddFriendButton />
    </main>
  );
};

export default page;
