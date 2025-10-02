import { getUserInfo } from "@/shared/services/user";
import { Empty } from "@/shared/blocks/common";
import { Form as FormType } from "@/shared/types/blocks/form";
import { FormCard } from "@/shared/blocks/form";

export default async function ProfilePage() {
  const user = await getUserInfo();
  if (!user) {
    return <Empty message="no auth" />;
  }

  const form: FormType = {
    title: "Profile",
    fields: [
      { name: "name", title: "Name", type: "text" },
      { name: "email", title: "Email", type: "email" },
    ],
    data: user,
    passby: {
      type: "user",
      user: user,
    },
    submit: {
      handler: async (data: FormData, passby: any) => {
        "use server";

        throw new Error("test");

        return {
          status: "success",
          message: "Profile updated" + data.get("name") + data.get("email"),
        };
      },
      button: {
        title: "Save",
      },
    },
  };

  return (
    <div className="space-y-8">
      <FormCard form={form} />
    </div>
  );
}
