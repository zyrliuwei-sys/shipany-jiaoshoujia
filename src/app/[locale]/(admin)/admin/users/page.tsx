import { Header, Main, MainHeader } from "@/shared/blocks/dashboard";
import { TableCard } from "@/shared/blocks/table";
import { type Table } from "@/shared/types/blocks/table";
import { getUsers } from "@/shared/services/user";
import { getTranslations } from "next-intl/server";

export default async function AdminUsersPage() {
  const t = await getTranslations("admin.user.list");

  const users = await getUsers();

  const table: Table = {
    columns: [
      { name: "id", title: "ID", type: "copy" },
      { name: "name", title: "Name" },
      { name: "image", title: "Avatar", type: "image" },
      { name: "email", title: "Email", type: "copy" },
      { name: "emailVerified", title: "Email Verified", type: "label" },
      { name: "createdAt", title: "Created At", type: "time" },
    ],
    data: users,
  };

  return (
    <>
      <Header />
      <Main>
        <MainHeader title={t("title")} />
        <TableCard table={table} />
      </Main>
    </>
  );
}
